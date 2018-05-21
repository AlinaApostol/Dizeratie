coffee = require 'coffee-script'
coffeeExtensions =   /.*\.(coffee\.md|litcoffee|coffee)$/ # RexExp for all coffeescript extensions
literateExtensions = /.*\.(coffee\.md|litcoffee)$/i

module.exports = [                                # This ResourceConverter is using an [] instead of {}.
                                                  # Key names of RC are assumed from their posision in the array:
    '$coffee-script'                              # `name` & flags as a String at pos 0
    "'coffee-script' compiler."                   # `descr` at pos 1
    [ coffeeExtensions ]                          # `filez` [] at pos 2

    (m)->                                         # `convert` Function at pos 3
      @options.literate = if m.srcFilename.match(literateExtensions) then true else false
      coffee.compile m.converted, @options

    (srcFn)->                                     # `convFilename` Function at pos 4
      ext = srcFn.replace coffeeExtensions , "$1" # retrieve matched extension
      srcFn.replace (new RegExp ext+'$'), 'js'    # replace it and return new filename

    { bare: false }                               # the default options object. If convFilename is absent, it can take its place.
  ]