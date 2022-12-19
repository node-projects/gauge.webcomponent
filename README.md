# gauge.webcomponent

# description

port of a few gauge components to webcomponents and typescript.
so that they would be usable in web-component-designer: https://node-projects.github.io/web-component-designer-demo/index.html

# sample in web-component-designer

[Sample in Designer](https://node-projects.github.io/web-component-designer-demo/index.html?loadAllImports&npm=@node-projects/gauge.webcomponent&html=%3Cnode-projects-double-gauge%20left-value=%2237%22%20right-value=%2264%22%20style=%22width:200px;height:200px;position:absolute;left:107px;top:55px;%22%3E%3C/node-projects-double-gauge%3E%20%3Cnode-projects-css-gauge%20value=%2227%22%20display-value=%2226%22%20style=%22width:200px;height:200px;position:absolute;left:394px;top:67px;%22%3E%3C/node-projects-css-gauge%3E)

# included components

- node-projects-double-gauge  -> a port of https://github.com/boonzaai/doublegauge
- node-projects-css-gauge -> a port of https://github.com/rotvalli/css-gauge
- node-projects-material-gauge -> a port of https://github.com/sathomas/material-gauge
- node-projects-gauge-js -> (WIP) a port of https://github.com/bernii/gauge.js to typescript and a webcomponent
- node-projects-canvas-gauges -> (WIP) a port of https://github.com/Mikhus/canvas-gauges

# use:

you could import every single component explictly, or all at once.

# todo look if we also integrate:
(maybe some only as a wraper (if they are still maintained))

- https://github.com/naikus/svg-gauge ??
- https://github.com/JohnrBell/Gauge_CSS