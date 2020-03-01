<link id="viewx-style-style-0" rel="stylesheet" type="text/css" href="https://unpkg.com/highlight.js@9.18.1/styles/darkula.css">

---
### JSONX Manual
 - [Home](https://jsonx.anydata.app)
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../samples/index.html)
 - [Roadmap](../roadmap/index.html)
 - [Full API Docs](../../index.html)
---


# Examples

1. [Getting Started Basic Example](https://jsfiddle.net/yawetse/ka7ghypd/6/) 
1. [Custom Library: React Bootstrap Example](https://jsfiddle.net/yawetse/gctmsojp/16/) 

Some other sample page
<div style="color:red;">
this is raw <strong>html</strong>
  <section id="putHere">replace</section>
</div>
<script src="../../media/basic/basic.js"></script>




### Example Browser Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>JSONX TEST</title>
    <script type="text/javascript" src="jsonx.umd.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript">
      const sampleJSONX = {
        component: 'div',
        props: {
          id: 'generatedJSONX',
          className:'jsonx',
        },
        children: [
          {
            component: 'p',
            props: {
              style: {
                color: 'red',
                fontWeight:'bold',
              },
            },
            __dangerouslyEvalProps:{
              onClick:'()=>alert("click works")'
            },
            children:'hello world',
          },
        ],
      };
      const boundConfig = {
        debug:true, 
      };
      jsonx.jsonxRender.call(boundConfig,{ jsonx: sampleJSONX, querySelector:'#root', });
    </script>
  </body>
</html>
 ```

<div style="text-align:center;">

<img src="https://raw.githubusercontent.com/repetere/jsonx/master/docs/jsonx-logo.png" style="max-width:160px;">

</div>

<!-- jsdoc src/components.js -c jsdoc.json  -->


---
### JSONX Manual
 - [Getting Started](../getting-started/index.html)
 - [External and Custom Components](../using-external-and-custom-components/index.html)
 - [Using Advanced Props](../using-advanced-props/index.html)
 - [Creating React Components and Component Libraries](../creating-react-components-and-component-libraries/index.html)
 - [Roadmap](../roadmap/index.html)
 - [JSONX & JXM Spec](../spec/index.html)
 - [Samples](../examples/index.html)