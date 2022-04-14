# Viewport Restrict Component

This component created to restrict some viewport or orientation with overlay.

## How to use

### Code

Import the `ViewportRestrict` to your code

```jsx
import ViewportRestrict from 'component/viewport';

class App extends Component {
    render() {
        return (
            <ViewportRestrict
            	display={true}
            	type="landscape"
                image="https://fightingspirit.ff.garena.com/static/media/scape.8895356f.png"
                animation={true}
                animationSpeed=1500
                backgroundColor="rgba(0,0,0,.5)"
            />
        );
    }
}
```

### Props

| Props             | Type     | Parameters                                                                                                     | Definition                                                           |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| display           | Boolean  | `true` or `false`                                                                                              | Show/Hide component                                                  |
| type `(Required)` | String   | `portrait/landscape/desktop_landscape`                                                                         | Viewport or orientation to restrict                                  |
| image             | node/URL | `require('./scape.png')`                                                                                       | Image to show on overlay. This could be node directory or image url. |
| animation         | Boolean  | `true`                                                                                                         | Toggle Animation                                                     |
| animationSpeed    | Number   | `1500`                                                                                                         | Change Rotating Animation Speed                                      |
| backgroundColor   | String   | `rgba(9, 18, 34, 1)`                                                                                           | Change Background Color. Could be RGBA code or Hex Code              |
| text              | String   | `Silahkan buka di smartphone kamu atau putar smartphone kamu ke posisi vertical untuk visual yang lebih baik.` | Text to display when overlay is showing                              |
