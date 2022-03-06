function doChange()
{
    var selected_head = document.getElementById('head').options[document.getElementById('head').selectedIndex].text;
    var fur = document.getElementById('fur').options[document.getElementById('fur').selectedIndex].text + ".png";
    var eyecolor = document.getElementById('eyecolor').options[document.getElementById('eyecolor').selectedIndex].text.toLowerCase() + ".png";
    var eyeshape = document.getElementById('eyeshape').options[document.getElementById('eyeshape').selectedIndex].text;
    var pupil = document.getElementById('pupil').options[document.getElementById('pupil').selectedIndex].text;
    var ear = document.getElementById('ear').options[document.getElementById('ear').selectedIndex].text;
    var whiskercolor = document.getElementById('whiskercolor').options[document.getElementById('whiskercolor').selectedIndex].text + ".png";
    var whiskershape = document.getElementById('whiskershape').options[document.getElementById('whiskershape').selectedIndex].text;
    var head = "";
    if (selected_head === "Floofy") head = "Floofy_head/";
    document.getElementById("shadowlayer").src = "https://kittycats.ws/online/images/ears/" + head + ear + "_SHADOW.png";
    document.getElementById("furlayer").src = "https://kittycats.ws/online/images/ears/" + head + ear + "/" + fur;
    document.getElementById("eyeslayer").src = "https://kittycats.ws/online/images/eyes/" + eyeshape + "_" + pupil + "/" + eyecolor;
    document.getElementById("whiskerslayer").src = "https://kittycats.ws/online/images/whiskers/" + whiskershape + "/" + whiskercolor;
    if (fur.substring(0,11) === "Confetti - ")
        document.getElementById('confetti').className = "show";
    else
        document.getElementById('confetti').className = '';
}

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        document.getElementById('head').addEventListener('change', doChange)
        document.getElementById('fur').addEventListener('change', doChange)
        document.getElementById('eyecolor').addEventListener('change', doChange)
        document.getElementById('eyeshape').addEventListener('change', doChange)
        document.getElementById('pupil').addEventListener('change', doChange)
        document.getElementById('ear').addEventListener('change', doChange)
        document.getElementById('whiskercolor').addEventListener('change', doChange)
        document.getElementById('whiskershape').addEventListener('change', doChange)
    }
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js', {
        scope: '/Build-a-Cat/'
    }).catch(function(error) {
        console.log('Registration failed with ' + error);
    });
}