# InGaia FrontEnd Test 01

Convert the following design to a Single Web Application:

![Screenshot 1](screenshots/screenshot1.jpg)
![Screenshot 2](screenshots/screenshot2.jpg)
![Screenshot 3](screenshots/screenshot3.jpg)

[Figma preview](https://www.figma.com/proto/COnJnZhaRmmAHt6MjBlRT3c1/Frontend---Test?node-id=20%3A1070&scaling=min-zoom)

[Figma opened file](https://www.figma.com/file/COnJnZhaRmmAHt6MjBlRT3c1/Frontend---Test?node-id=0%3A1)

## Requirements
- Fork this project and make a pull request when is done
- Use a popular FrontEnd Framework (React, Vue, Angular, etc)
- Responsive (we did not create a mobile design version because we would like to see your way to solve this problem)
- Google SignIn is mandatory
- List all videos of this playlist: https://www.youtube.com/playlist?list=PL6t93nUFQQ1ZiXMfhPyhjb0PX3LgEVMcF
- Unit tests

## Tips
- We use a simple and fast FrontEnd Framework called [MarkoJs](https://markojs.com), but feel free to choose your preferred framework.
- We ❤️ animations
- Prefer inline SVG instead of images.
- Tools like code coverage, end-to-end tests and continuos integration looks good to us.


## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```

## Unit testing
```
npm run test:unit
```

## Notes for code review
 - This project is completed using vue2.0
 - vuex is used for state management and buefy for styling and layout management
 - vue-router and vue-google-login are used for routing and google oauth. For Oauth, I have created a test app in google console with my google account.
 - jest is used for testing (for testing, I have added very simple one just for demonstration purpose)
 - eslint is implemented to make sure the code is eslint free
 - Some styling maybe not matching with original design as I did it in rush (for example, I have used default buefy switcher for the switcher in options page instead of making custom component to save time. Also, scrollbar and seperator image is not matching with the design)
