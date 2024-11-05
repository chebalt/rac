# KKIA Codebase

## Remote CM Development Instructions

1. CD into src/Project/KKIA/rendering/
2. Copy .env to .env.local
3. In .env.local set SITECORE_EDGE_CONTEXT_ID to `5k8CgZrDZcdZGBSYTbpQL5` for DEV Preview or `4zas7N2fwln8rmxqsDRDff` for DEV Live
4. In .env.local set SITECORE_SITE_NAME to `KKIA`
5. On command prompt run `npm run start:connected` to start NextJS application

## Local CM Development Instructions

1. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

*** 

## Git Flow

We will use the [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) documented by Atlassian

## Creating KKIA Components
### Component with Datasource
Replace _%module_ with module name and  _%component_ with component name
1. Create the datasource template at `/sitecore/templates/Project/KKIA/%module/%component`
	* Set the datasource fields
	* Set the datasource logo
	* Set the datasource Standard Values
2. Create the datasource folder template at `/sitecore/templates/Project/KKIA/%module/%component Folder`
	* Set the datasource folder logo
	* Set the datasource folder Insert Options
3. Create rendering under `/sitecore/layout/Renderings/Project/KKIA/%module/%rendering` and fill the following fields
	* **Component Name**: Remove spaces from component name
	* **Other properties**:
		* `IsRenderingsWithDynamicPlaceholders` | `true`
	* **Datasource Location**: `query:$site/*[@@name='Data']/*[@@templatename='%component Folder']`
	* **Datasource Template**: `/sitecore/templates/Project/KKIA/%module/%component`
4. Add rendering to the appropriate Available Rendering entry at `/sitecore/content/KKIA/KKIA/Presentation/Available Renderings/%module`
5. Add the component folder for site level datasource at `/sitecore/content/KKIA/KKIA/Data/%component`
6. With [JSS installed globally](https://doc.sitecore.com/xmc/en/developers/jss/latest/jss-xmc/install-the-jss-cli-globally.html) go to `\src\Project\KKIA\rendering\` and type `jss scaffold %component` to create the basic NextJS component

## Development Workflow
1. Run Docker Desktop
2. Checkout the develop branch and pull the latest changes
	*  `git checkout develop`
	* `git pull`
3. Create your feature branch following the naming convention `feature/%ticket-%description`
	* Example: `feature/feature/PBFRIJKKI-24-logo`
4. Run `.\docker\clean.ps1` to clear the database
5. Run `.\up.ps1`
6. Run `dotnet sitecore ser push`
7. [Connect XM Cloud Pages to your local XM instance](https://doc.sitecore.com/xmc/en/developers/xm-cloud/connect-xm-cloud-pages-to-your-local-xm-instance.html)
8. Develop your feature testing on Sitecore Pages
9. Commit and push changes to branch
10. Create PR when you are done
11. Check for PR comments and fix them

If you have enviromental issues when bringing up your docker environment usually running `docker system prune` will fix them
