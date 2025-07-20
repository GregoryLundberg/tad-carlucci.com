var headSel
var furSel
var eColorSel, eShapeSel, ePupilSel
var earSel
var wColorSel, wShapeSel
var noBoxRad, girlBoxRad, boyBoxRad

var canonical = window.location.href.split('#')[0]

(function(){
    
    function doChange() {
        var selected_head = headSel.options[   headSel.selectedIndex   ].text
        var fur           = furSel.options[    furSel.selectedIndex    ].text
        var eyecolor      = eColorSel.options[ eColorSel.selectedIndex ].text
        var eyeshape      = eShapeSel.options[ eShapeSel.selectedIndex ].text
        var pupil         = ePupilSel.options[ ePupilSel.selectedIndex ].text
        var ear           = earSel.options[    earSel.selectedIndex    ].text
        var whiskercolor  = wColorSel.options[ wColorSel.selectedIndex ].text
        var whiskershape  = wShapeSel.options[ wShapeSel.selectedIndex ].text

        var noBox   = noBoxRad.checked
        var girlBox = girlBoxRad.checked
        var boyBox  = boyBoxRad.checked
        
        var head = (selected_head === 'Floofy') ? 'Floofy_head/' : ''

        document.getElementById('shadowlayer'  ).src = 'https://kittycats.ws/online/images/ears/' + head + ear + '_SHADOW.png'
        document.getElementById('furlayer'     ).src = 'https://kittycats.ws/online/images/ears/' + head + ear + '/' + fur + '.png'
        document.getElementById('eyeslayer'    ).src = 'https://kittycats.ws/online/images/eyes/' + eyeshape + '_' + pupil + '/' + eyecolor.toLowerCase() + '.png'
        document.getElementById('whiskerslayer').src = 'https://kittycats.ws/online/images/whiskers/' + whiskershape + '/' + whiskercolor + '.png'

        document.getElementById('confetti').className = (fur.substring(0,11) === 'Confetti - ') ? 'show' : ''

        var box
        if (noBox) {
            document.getElementById('boxlayer').style.visibility = "hidden"
            box = 0
        } else {
            document.getElementById('boxlayer').src = "https://kittycats.ws/online/HUD_BOX_" + ((girlBox) ? "GIRL" : "BOY") + ".png"
            document.getElementById('boxlayer').style.visibility = "visible"
            box = (girlBox) ? 1 : 2
        }
        var link = canonical + '#' + headSel.options[   headSel.selectedIndex   ].getAttribute('data-tag') + '.' +
                                     furSel.options[    furSel.selectedIndex    ].getAttribute('data-tag') + '.' +
                                     eColorSel.options[ eColorSel.selectedIndex ].getAttribute('data-tag') + '.' +
                                     eShapeSel.options[ eShapeSel.selectedIndex ].getAttribute('data-tag') + '.' +
                                     ePupilSel.options[ ePupilSel.selectedIndex ].getAttribute('data-tag') + '.' +
                                     earSel.options[    earSel.selectedIndex    ].getAttribute('data-tag') + '.' +
                                     wColorSel.options[ wColorSel.selectedIndex ].getAttribute('data-tag') + '.' +
                                     wShapeSel.options[ wShapeSel.selectedIndex ].getAttribute('data-tag') + '.' +
                                     box
        document.getElementById('catlink').href = link
                                     
    }
    
    function makeCrcTable() {
        var c
        var crcTable = []
        for(var n =0; n < 256; n++) {
            c = n
            for(var k =0; k < 8; k++) {
                c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1))
            }
            crcTable[n] = c
        }
        return crcTable
    }

    function crc32(str) {
        var crcTable = window.crcTable || (window.crcTable = makeCrcTable())
        var crc = 0 ^ (-1)

        for (var i = 0; i < str.length; i++ ) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF]
        }

        return (crc ^ (-1)) >>> 0
    }

    function addTags(sel, isShort = false) {
        var children = sel.children
        for (var i = 0; i < children.length; i++) {
            var opt = children[i]
            var tag = crc32(opt.value).toString()
            if (isShort) {
                tag = tag.substring(0, 3)
            }
            opt.setAttribute('data-tag', tag)
            opt.setAttribute('data-index', i.toString())
        }
    }

    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
            headSel     = document.getElementById('head'        )
            furSel      = document.getElementById('fur'         )
            eColorSel   = document.getElementById('eyecolor'    )
            eShapeSel   = document.getElementById('eyeshape'    )
            ePupilSel   = document.getElementById('pupil'       )
            earSel      = document.getElementById('ear'         )
            wColorSel   = document.getElementById('whiskercolor')
            wShapeSel   = document.getElementById('whiskershape')
            noBoxRad    = document.getElementById('noBox'       )
            girlBoxRad  = document.getElementById('girlBox'     )
            boyBoxRad   = document.getElementById('boyBox'      )
            addTags(headSel,   true)
            addTags(furSel         )
            addTags(eColorSel      )
            addTags(eShapeSel, true)
            addTags(ePupilSel, true)
            addTags(earSel         )
            addTags(wColorSel      )
            addTags(wShapeSel      )
            headSel.addEventListener(   'change', doChange)
            furSel.addEventListener(    'change', doChange)
            eColorSel.addEventListener( 'change', doChange)
            eShapeSel.addEventListener( 'change', doChange)
            ePupilSel.addEventListener( 'change', doChange)
            earSel.addEventListener(    'change', doChange)
            wColorSel.addEventListener( 'change', doChange)
            wShapeSel.addEventListener( 'change', doChange)
            noBoxRad.addEventListener(  'change', doChange)
            girlBoxRad.addEventListener('change', doChange)
            boyBoxRad.addEventListener( 'change', doChange)
            var hash = window.location.hash
            if (hash.length > 1) {
                var values = hash.substring(1).split('.')
                if (values.length == 9) {
                    headSel.selectedIndex   = headSel.querySelector(  '[data-tag="'+values[0]+'"]').getAttribute('data-index')
                    furSel.selectedIndex    = furSel.querySelector(   '[data-tag="'+values[1]+'"]').getAttribute('data-index')
                    eColorSel.selectedIndex = eColorSel.querySelector('[data-tag="'+values[2]+'"]').getAttribute('data-index')
                    eShapeSel.selectedIndex = eShapeSel.querySelector('[data-tag="'+values[3]+'"]').getAttribute('data-index')
                    ePupilSel.selectedIndex = ePupilSel.querySelector('[data-tag="'+values[4]+'"]').getAttribute('data-index')
                    earSel.selectedIndex    = earSel.querySelector(   '[data-tag="'+values[5]+'"]').getAttribute('data-index')
                    wColorSel.selectedIndex = wColorSel.querySelector('[data-tag="'+values[6]+'"]').getAttribute('data-index')
                    wShapeSel.selectedIndex = wShapeSel.querySelector('[data-tag="'+values[7]+'"]').getAttribute('data-index')
                    var box = parseInt(values[8])
                    switch(box) {
                        case 1:
                            girlBoxRad.checked = true
                            break
                        case 2:
                            boyBoxRad.checked = true
                            break
                        default:
                            noBoxRad.checked = true
                    }
                    doChange()
                }
            }
            document.getElementById('catlink').href = canonical
        }
    })
}())

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js', {
        scope: '/Build-a-Cat/'
    }).catch(function(error) {
        console.log('Service worker registration failed with ' + error)
    })
}
