### CYarn使用手册
	`yarn install` 命令用来安装工程的所有依赖，这是下载工程代码常做的事情，也可能是其他的开发人员在工程里新增加的功能，你需要去down下来

	如果你曾经使用npm的话，你可能会经常使用到--save或--save-dev， 这些命令在yarn中已经被yarn add和yarn add --dev所取代，参考更多信息[https://yarnpkg.com/en/docs/cli/add](https://yarnpkg.com/en/docs/cli/add "documentation")

1. yarn install

		安装package.json的所有依赖列表到node-modules目录
2. yarn install --flat
		仅仅允许包有一个版本， 第一次运行会提醒为每一个依赖包选择一个版本
		