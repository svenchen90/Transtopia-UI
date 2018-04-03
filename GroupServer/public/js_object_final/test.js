var tab1 = {
	lid: localIDGenerator(),
	name: '标签1',
	questions: [
		{
			lid: '_nzjs9whbt',
			type: 'singleSelect',
			required: 0,
			title: '请输入问题',
			tooltip: '',
			options: [
				{
					lid: "_4wl6caiet",
					name: '选项1',
					value: 0,
					isDefault: 0
				},
				{
					lid: "_5ndw0aln9",
					name: '选项2',
					value: 0,
					isDefault: 0
				}
			]
		},
		{
			lid: '_ezj0vd2hh',
			type: 'multiSelect',
			required: 0,
			title: '11111111',
			tooltip: '',
			options: [
				{
					lid: "_66vb3qv0q",
					name: '111111',
					value: 0,
					isDefault: 0
				},
				{
					lid: "_aeso5n1kq",
					name: '222222',
					value: 0,
					isDefault: 0
				}
			],
			constraints: [
				{
					lid: '_nzjs9whbt',
					type: 1,
					options: [
 						{
							lid: '_4wl6caiet'
						},
						{
							lid: '_5ndw0aln9'
						},
					],
				}
			]
		},
		{
			lid: '_ch4hd4jpm',
			type: 'input',
			sub_type: 'time',
			required: 1,
			title: 'AAAAA',
			tooltip: '这是一条提示信息',
			/* options: [
				{
					lid: "_is6frrvyt",
					name: 'AAAAA',
					value: 0,
					isDefault: 0
				},
				{
					lid: "_s01fk5bat",
					name: 'BBBBB',
					value: 0,
					isDefault: 0
				}
			], */
			constraints: [
				{
					lid: '_nzjs9whbt',
					type: 1,
					options: [
						{
							lid: '_4wl6caiet'
						},
						{
							lid: '_5ndw0aln9'
						},
					],
				},{
					lid: '_ezj0vd2hh',
					type: 0,
					options: [
						{
							lid: '_66vb3qv0q'
						},
						{
							lid: '_aeso5n1kq'
						},
					],
				},
			]
		},
		{
			lid: '_dqbp848fp',
			type: 'text',
			text: 'asfasdfsafs'
		}
	] 
};
/* 
FormDisplay({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1]
}, function(a){console.log(a)});
 */

/* $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
	checkboxClass: 'icheckbox_flat-green',
	radioClass: 'iradio_flat-green'
}); */

FormDesigner({
	lid: localIDGenerator(),
	name: '新的物品',
	tabs: [tab1]
}, function(a){console.log(a)});
