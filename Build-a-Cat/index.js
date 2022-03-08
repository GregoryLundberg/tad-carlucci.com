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
        
        var head = (selected_head === 'Floofy') ? 'Floofy_head/' : ''

        document.getElementById('shadowlayer'  ).src = 'https://kittycats.ws/online/images/ears/' + head + ear + '_SHADOW.png'
        document.getElementById('furlayer'     ).src = 'https://kittycats.ws/online/images/ears/' + head + ear + '/' + fur + '.png'
        document.getElementById('eyeslayer'    ).src = 'https://kittycats.ws/online/images/eyes/' + eyeshape + '_' + pupil + '/' + eyecolor.toLowerCase() + '.png'
        document.getElementById('whiskerslayer').src = 'https://kittycats.ws/online/images/whiskers/' + whiskershape + '/' + whiskercolor + '.png'

        document.getElementById('confetti').className = (fur.substring(0,11) === 'Confetti - ') ? 'show' : ''

        if (noBox)
            document.getElementById('boxlayer').style.visibility = "hidden"
        else {
            document.getElementById('boxlayer').src = "https://kittycats.ws/online/HUD_BOX_" + ((girlBox) ? "GIRL" : "BOY") + ".png"
            document.getElementById('boxlayer').style.visibility = "visible"
        }
    }

    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
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
