/*
#SEMANTIC VERSIONING

"mongoose": "6.9.0", // Major.Minor.Patch

patch for fixing bugs. 6.9.1
minor is used for adding new feature, don't break the existing version. 6.10.0
major is used for new adding new feature, may break the existing version. 7.0.0

"^6.9.0" - caret sign is use for new/updated version can be downloaded till not major changes is doen.
"4.x" - same as above

"~6.9.0" - tild sign is use for new/updated version can be downloaded for new patch versions.
"6.9.x" -same as above

"6.9.0" - same version is downloaded.

*/

/*

#LISTING THE INSTALLED PACKAGES
all version is shown - npm list
only we installed package is shown - npm list --depth=0

*/

/*

#VIEWING REGISTRY INFO FOR A PACKAGE
npm view mongoose
npm view mongoose dependencies
npm view mongoose versions

*/

/*

#INSTALLING A SPECIFIC VERSION
npm i mongoose@2.4.2

to check npm outdated packages

npm outdated 

*/

/*

#UPDATING LOCAL PACKAGES
npm update

when we run this command the latest version till minor version is updated 
major version is same.

To update major verison
sudo npm i -g npm-check-updates
npm-check-updates

npm-check-updates as short (ncu)

ncu - u - to upgrade
with this package.josn is update but dependency is not updated.
for that run - npm i

*/

/* 
#DEV DEPENDENCIES
dependencies - This is required for application to run properly.
dev dependencies - This is required for application develop not for produciton or at execution.

npm i jshint --save-dev
*/

/* 

# UNINSTALLING LOCAL PACKAGES
npm uninstall package_name
npm un package_name

*/

/* 

#GLOBAL PACKAGES
npm 
npm i -g 

*/

/*

#PUBLISHING A PACKAGE
create a account on npm 

npm login
name :
password:
email:

npm publish

#PUBLISHED PACKAGE

npm version patch
npm publish

*/
