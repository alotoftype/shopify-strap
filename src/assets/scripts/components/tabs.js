export default class Tabs {

	constructor(options){
		this.data;
		this.types = ['tab', 'pane'];
		this.type;
		this.groups = [];
		this.activeGroups = [];
		this.activeChildren = [];
		this.activeItems = [];
		this.indexGroup;
		this.indexItem;
		this.memory = [];
		this.init(options);
	}

	init(options) {
		this.data = options;
		this.setDefaults();
		this.setMemory();

		this.groups['tab'] = document.querySelectorAll(this.data.tabGroup);
		this.groups['pane'] = document.querySelectorAll(this.data.paneGroup);

		for( let groupIndex = 0; groupIndex < this.groups['tab'].length; groupIndex++ ) {
			let tabItems = this.groups['tab'][groupIndex].children;

			for( let itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
				tabItems[itemIndex].addEventListener('click', this.onClick.bind(this, groupIndex, itemIndex), false);

				this.indexGroup = groupIndex;
				this.indexItem = itemIndex;

				if(!this.hasMemory()) continue;
				this.setNodes(groupIndex, itemIndex);
			}
		}
	};

	onClick(groupIndex, itemIndex) {
		this.setNodes(groupIndex, itemIndex);

		this.setCallback(this.indexGroup, this.indexItem);
	};

	setNodes(groupIndex, itemIndex) {
		this.indexGroup = groupIndex;
		this.indexItem = itemIndex;

		for( let i = 0; i < this.types.length; i++ ) {
			this.type = this.types[i];

			this.setActiveGroup();
			this.setActiveChildren();
			this.setActiveItems();
			this.putActiveClass();
		}

		this.memory[groupIndex] = [];
		this.memory[groupIndex][itemIndex] = true;

		localStorage.setItem('tabs', JSON.stringify(this.memory));
	};

	hasMemory() {
		if( typeof this.memory === 'undefined' ) return;
		if( typeof this.memory[this.indexGroup] === 'undefined' ) return;
		if( typeof this.memory[this.indexGroup][this.indexItem] === 'undefined') return;
		if( this.memory[this.indexGroup][this.indexItem] !== true ) return;
		return true;
	};

	setMemory() {
		if(localStorage.getItem('tabs') === null) return;
		if(localStorage.getItem('tabs').length == 0) return;

		this.memory = Object.values(JSON.parse(localStorage.getItem('tabs')));
	};

	putActiveClass() {
		for( let i = 0; i < this.activeChildren[this.type].length; i++ ) {
			this.activeChildren[this.type][i].classList.remove(this.data[this.type + 'Active']);
		}

		this.activeItems[this.type].classList.add(this.data[this.type + 'Active']);
	};

	setDefaults() {
		for( let i = 0; i < this.types.length; i++ ) {
			this.type = this.types[i];

			this.setOption(this.type + 'Group', '[data-' + this.type + 's]');
			this.setOption(this.type + 'Active', 'active');
		}
	};

	setOption(key, value) {
		this.data = this.data || [];
		this.data[key] = this.data[key] || value;
	};

	setActiveGroup() {
		this.activeGroups[this.type] = this.groups[this.type][this.indexGroup];
	};

	setActiveChildren() {
		this.activeChildren[this.type] = this.activeGroups[this.type].children;
	};

	setActiveItems() {
		this.activeItems[this.type] = this.activeChildren[this.type][this.indexItem];
	};

	setCallback() {
		if (typeof this.data.callback === "function") {
			this.data.callback(this.activeItems.tab, this.activeItems.pane);
		}
	};

	reset() {
		for( let groupIndex = 0; groupIndex < this.groups['tab'].length; groupIndex++ ) {
			tabItems = this.groups['tab'][groupIndex].children;
			paneItems = this.groups['pane'][groupIndex].children;

			for( let itemIndex = 0; itemIndex < tabItems.length; itemIndex++ ) {
				tabItems[itemIndex].classList.remove(this.data['tabActive']);
				paneItems[itemIndex].classList.remove(this.data['paneActive']);
			}
		}
		localStorage.removeItem('tabs');
	};

};
