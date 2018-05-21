# [uRequire](http://urequire.org) ResourceConverter for the [*coco*](https://github.com/satyr/coco) coffeescript-y language.

Converts [`*.coco`](https://github.com/satyr/coco) to javascript `*.js` in your bundle.

Included in uRequire & added to [`bundle.resources`](http://urequire.org/masterdefaultsconfig.coffee#bundle.resources) by default.

Its really a **one-liner**:

```
    ['$coco', [ '**/*.co'], function(m){require(coco).compile(m.converted, this.options)}, '.js']
```

See http://urequire.org/resourceconverters.coffee#the-alternative-less-verbose-array-way & http://github.com/anodynos/urequire-rc-coffee-script

# License

The MIT License

Copyright (c) 2014 Agelos Pikoulas (agelos.pikoulas@gmail.com)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
