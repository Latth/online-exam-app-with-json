let sunucudanDonen;



var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       sunucudanDonen = JSON.parse(baglanti.responseText)
       soruGetir();
    }

    return sunucudanDonen;
};
baglanti.open("GET", "data.json", true);
baglanti.send();

const goruntulemeAlani = document.getElementById('sinav')
const soru = document.getElementById('soru');
const secenekler = document.getElementsByName('secenek');

const aciklamaA = document.getElementById('aciklamaA');
const aciklamaB = document.getElementById('aciklamaB');
const aciklamaC = document.getElementById('aciklamaC');
const aciklamaD = document.getElementById('aciklamaD');

const gonder = document.getElementById('gonder');

let puan = 0;
let sira=0;

function soruGetir(){
    secimiTemizle();

    let siradakiSoru = sunucudanDonen.sorular[sira]
    soru.innerHTML = siradakiSoru.soru;
    
    aciklamaA.innerText = siradakiSoru.secenekA
    aciklamaB.innerText = siradakiSoru.secenekB
    aciklamaC.innerText = siradakiSoru.secenekC
    aciklamaD.innerText = siradakiSoru.secenekD
}

function secimiTemizle(){
    secenekler.forEach(secenek => secenek.checked = false)
}

function secimiAl() {
    let secim;
    
    secenekler.forEach(secenek => {
        if(secenek.checked) {
            secim = secenek.id;
        }
    })

    return secim;
    
}

gonder.addEventListener('click', ()=> {
    let secilen = secimiAl();
    
    if(secilen){
        if(secilen == sunucudanDonen.sorular[sira].cevap){
            puan++; 
        }
    }
    sira++;

    if(sira < sunucudanDonen.sorular.length){
        soruGetir()
        
    }else {
        goruntulemeAlani.innerHTML = `<h2>Sınavı başarıyla tamamladınız. Puanınız ${puan}/${sunucudanDonen.sorular.length}</h2>
        <button onclick="location.reload()">Yeniden Başla</button>
        `
    }
})

