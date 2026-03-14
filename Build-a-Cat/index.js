var headSel
var furSel
var eyeColorSel, eyeShapeSel, eyePupilSel
var earSel
var whiskerColorSel, whiskerShapeSel
var noBoxRad, girlBoxRad, boyBoxRad

var headOpts = ["RolliePollie", "Floofy", "Lemon", "Dreamy", "Chubby"]
var eyeShapeOpts = ["Curious", "Mysterious"]
var eyePupilOpts = ["Big", "Small"]

var canonical

(function(){
    function doChange() {
        var selected_head = document.getElementById('head'        ).options[document.getElementById('head'        ).selectedIndex].text
        var fur           = document.getElementById('fur'         ).options[document.getElementById('fur'         ).selectedIndex].text
        var eyecolor      = document.getElementById('eyecolor'    ).options[document.getElementById('eyecolor'    ).selectedIndex].text
        var eyeshape      = document.getElementById('eyeshape'    ).options[document.getElementById('eyeshape'    ).selectedIndex].text
        var pupil         = document.getElementById('pupil'       ).options[document.getElementById('pupil'       ).selectedIndex].text
        var ear           = document.getElementById('ear'         ).options[document.getElementById('ear'         ).selectedIndex].text
        var whiskercolor  = document.getElementById('whiskercolor').options[document.getElementById('whiskercolor').selectedIndex].text
        var whiskershape  = document.getElementById('whiskershape').options[document.getElementById('whiskershape').selectedIndex].text

        var noBox   = document.getElementById('noBox'  ).checked
        var girlBox = document.getElementById('girlBox').checked
        var boyBox  = document.getElementById('boyBox' ).checked
        
        var head = (selected_head !== 'Rollie Pollie') ? selected_head + '_head/' : ''

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
        var link = canonical + '#'
        link += [
            headSel.options[         headSel.selectedIndex         ].getAttribute('data-tag'),
            furSel.options[          furSel.selectedIndex          ].getAttribute('data-tag'),
            eyeColorSel.options[     eyeColorSel.selectedIndex     ].getAttribute('data-tag'),
            eyeShapeSel.options[     eyeShapeSel.selectedIndex     ].getAttribute('data-tag'),
            eyePupilSel.options[     eyePupilSel.selectedIndex     ].getAttribute('data-tag'),
            earSel.options[          earSel.selectedIndex          ].getAttribute('data-tag'),
            whiskerColorSel.options[ whiskerColorSel.selectedIndex ].getAttribute('data-tag'),
            whiskerShapeSel.options[ whiskerShapeSel.selectedIndex ].getAttribute('data-tag'),
            box
        ].join('~')
        history.replaceState({}, "", link)
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash>>>0;
    }

    function addTags(sel, shortTable = []) {
        var children = sel.children
        var value, base
        var encode = hashCode
        for (var i = 0; i < children.length; i++) {
            var opt = children[i]
            value = opt.value.replaceAll(/[\W_]/g,'')
            base = 16
            var tag
            if (shortTable.length) {
                tag = shortTable.indexOf(value).toString(base)
            } else {
                tag = hashCode(value).toString(base)
            }
            opt.setAttribute('data-tag', tag)
            opt.setAttribute('data-index', i.toString())
        }
    }
    
    function clickCopy(event) {
        const offsetX = (document.documentElement.clientWidth - event.clientX - 10) + "px"
        const offsetY = (event.clientY - 10) + "px"
        
        copyTextToClipboard(window.location.href, offsetX, offsetY)
    }

    async function copyTextToClipboard(text, msgX, msgY) {
        var message, color
        try {
            await navigator.clipboard.writeText(text);
            message = 'Cat permalink copied!'
            color   = '#cef'
        } catch (err) {
            console.error('Failed to copy permalink: ', err);
            message = 'Failed to copy permalink!'
            color   = '#fcc'
        }
        const notice = document.getElementById('copyNotice')
        notice.style.top             = msgY
        notice.style.right           = msgX
        notice.style.display         = 'block'
        notice.style.backgroundColor = color
        notice.style.opacity         = 1
        window.setTimeout(function() {
            notice.style.opacity = 0
            window.setTimeout(function() {
                notice.style.display = 'none'
            }, 550)
        }, 1000)
    }
  
    document.addEventListener('readystatechange', () => {
        canonical = window.location.href.split('#')[0]
        if (document.readyState === 'complete') {
            headSel         = document.getElementById('head'        )
            furSel          = document.getElementById('fur'         )
            eyeColorSel     = document.getElementById('eyecolor'    )
            eyeShapeSel     = document.getElementById('eyeshape'    )
            eyePupilSel     = document.getElementById('pupil'       )
            earSel          = document.getElementById('ear'         )
            whiskerColorSel = document.getElementById('whiskercolor')
            whiskerShapeSel = document.getElementById('whiskershape')
            noBoxRad    = document.getElementById('noBox'  )
            girlBoxRad  = document.getElementById('girlBox')
            boyBoxRad   = document.getElementById('boyBox' )
            addTags(headSel,         headOpts)
            addTags(furSel,          [])
            addTags(eyeColorSel,     [])
            addTags(eyeShapeSel,     eyeShapeOpts)
            addTags(eyePupilSel,     eyePupilOpts)
            addTags(earSel,          [])
            addTags(whiskerColorSel, [])
            addTags(whiskerShapeSel, [])
            document.getElementById('head'        ).addEventListener('change', doChange)
            document.getElementById('fur'         ).addEventListener('change', doChange)
            document.getElementById('eyecolor'    ).addEventListener('change', doChange)
            document.getElementById('eyeshape'    ).addEventListener('change', doChange)
            document.getElementById('pupil'       ).addEventListener('change', doChange)
            document.getElementById('ear'         ).addEventListener('change', doChange)
            document.getElementById('whiskercolor').addEventListener('change', doChange)
            document.getElementById('whiskershape').addEventListener('change', doChange)
            document.getElementById('noBox'       ).addEventListener('change', doChange)
            document.getElementById('girlBox'     ).addEventListener('change', doChange)
            document.getElementById('boyBox'      ).addEventListener('change', doChange)
            document.getElementById('copyButton'  ).addEventListener('click', clickCopy)
            var hash = window.location.hash
            if (hash.length > 1) {
                var values = hash.substring(1).split('~')
                var opt
                if (values.length == 9) {
                    opt = headSel.querySelector(        '[data-tag="'+values[0]+'"]')
                    if (opt !== null) headSel.selectedIndex         = opt.getAttribute('data-index')
                    opt = furSel.querySelector(         '[data-tag="'+values[1]+'"]')
                    if (opt !== null) furSel.selectedIndex          = opt.getAttribute('data-index')
                    opt = eyeColorSel.querySelector(    '[data-tag="'+values[2]+'"]')
                    if (opt !== null) eyeColorSel.selectedIndex     = opt.getAttribute('data-index')
                    opt = eyeShapeSel.querySelector(    '[data-tag="'+values[3]+'"]')
                    if (opt !== null) eyeShapeSel.selectedIndex     = opt.getAttribute('data-index')
                    opt = eyePupilSel.querySelector(    '[data-tag="'+values[4]+'"]')
                    if (opt !== null) eyePupilSel.selectedIndex     = opt.getAttribute('data-index')
                    opt = earSel.querySelector(         '[data-tag="'+values[5]+'"]')
                    if (opt !== null) earSel.selectedIndex          = opt.getAttribute('data-index')
                    opt = whiskerColorSel.querySelector('[data-tag="'+values[6]+'"]')
                    if (opt !== null) whiskerColorSel.selectedIndex = opt.getAttribute('data-index')
                    opt = whiskerShapeSel.querySelector('[data-tag="'+values[7]+'"]')
                    if (opt !== null) whiskerShapeSel.selectedIndex = opt.getAttribute('data-index')
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