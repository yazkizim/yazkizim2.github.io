var izindates = []
var farkdates = []
let editorChangeHandlerId;
var dataT;
var gostergelerdata;
var gostergelerArr;
var haberlerArr;
var katsayilar;
var datam;
var toplamSayfa = 20;
var goruntulenecekSayfa = 5;
var sayfadakiHaber = 5;
var sonSayfaZiyaretCount = 0;
var adliyeler;
 

function hesaplax(x, y){	
	if (x == null) { 
		x = 0.00;
	}
	
	x = parseFloat(x * 68.31);
	
	if (y == false) { 
		z = parseFloat(x / 4000);		
	} else { 
		z = parseFloat(x / 20000);
	}
		
	return sonuc;
}

function listGroupcClick($this,  $alias) {
    console.log($this.text());  // Will log Paris | France | etc...

    console.log($alias);  // Will output whatever is in data-alias=""
}

function maashesapla(){
		if ($('#hesaplama').val() > 0) {
			var aylik_gosterge = window.katsayilar[8].aylik_katsayi / 30 * 14;		
			var taban_ayligi_katsayisi = window.katsayilar[8].taban_ayligi_katsayi / 30 * 14;
			var yan_odeme_katsayisi = window.katsayilar[8].yan_odeme_katsayi / 30 * 14;
			var gelir_vergisi_istisna = window.katsayilar[8].gelir_vergisi_istisna / 30 * 14;
			var damga_vergisi_istisna = window.katsayilar[8].damga_vergisi_istisna / 30 * 14;
			var son_artis = window.katsayilar[8].enflasyon;

		} else { 
			var aylik_gosterge = window.katsayilar[1].aylik_katsayi;		
			var taban_ayligi_katsayisi = window.katsayilar[1].taban_ayligi_katsayi;
			var yan_odeme_katsayisi = window.katsayilar[1].yan_odeme_katsayi;
			var gelir_vergisi_istisna = window.katsayilar[1].gelir_vergisi_istisna;
			var damga_vergisi_istisna = window.katsayilar[1].damga_vergisi_istisna;
			var son_artis = window.katsayilar[1].enflasyon;
		}
		
		var fark_artis = window.katsayilar[2].enflasyon;		
		var toplu_soz_artis = window.katsayilar[3].enflasyon;
		var toplu_soz_artis2 = window.katsayilar[4].enflasyon;
		var toplu_soz_artis3 = window.katsayilar[5].enflasyon;
		var toplu_soz_artis4 = window.katsayilar[6].enflasyon;
		// formdaki veriler 
		var unvan = $('#unvan').val();
		var kadro_derece = $('#kadroderece').val();
		var hizmet_yili = $('input[name="hizmetyili"]').val();
		var medeni_durum = $('#medenidurum').val();
		var mezuniyet = $('#mezuniyet').val();
		var cocuk72aydankucuk = $('#cocuk72aydankucuk').val();
		var cocuk72aydanbuyuk = $('#cocuk72aydanbuyuk').val();
		var engellicocuk72aydankucuk = $('#engellicocuk72aydankucuk').val();
		var engellicocuk72aydanbuyuk = $('#engellicocuk72aydanbuyuk').val();
		var sendikauye = 2119; 
		var tasiniryetkili = $('#tasiniryetkili').val();

		/*
			2024 Ocak sonrası 
			var sendikauye = 707; 
			
		*/
		var gorevyeri = $('#gorevyeri').val();
		var yabancidil = $('#yabancidil').val();
		var tabikanun = $('#tabikanun').val();
		var sendikaikramiye = $('#sendikaikramiye').val();
		/*
			2024 Ocak sonrası 
			var sendikaikramiye = 1;
			
			## maas.php den bu ay toplu sözleşme alınacak mı silinecek
		*/	
		var ilgili_derece_bilgileri = getGosterge(kadro_derece);
		var bes_uye_mi = $('#beskesintisi').val();
		var haciz = $('#haciz').val();
		
		// ## GELİRLER ## //
		// gösterge aylığı
		var gosterge_ayligi = ilgili_derece_bilgileri['gosterge'];
		var gosterge_ayligi_tutar = parseFloat(aylik_gosterge * gosterge_ayligi).toFixed(2);
		// ek gösterge
		var ek_gosterge_ayligi;
		var haciz_miktar;
		
		if (haciz > 0) {
			haciz_miktar = parseFloat(haciz * 1.0455).toFixed(2);
		} else {
			haciz_miktar = 0;
		}
		
		if (unvan == 1 || unvan == 4 || unvan == 5 || unvan == 10 || unvan == 11 ||  unvan == 12) {  // Yim , İcra Müdürü, İc.Md.Y.
			ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_mudur'];
				
			
		} else {  
			if (mezuniyet == 1) { 
				ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_uni'];
			} else { 
				ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_digerleri'];
			}
		}		
		var ek_gosterge_ayligi_tutar = parseFloat(ek_gosterge_ayligi * aylik_gosterge).toFixed(2);		
		// taban aylık
		var taban_ayligi_tutar = parseFloat(1000 * taban_ayligi_katsayisi).toFixed(2);
		// kıdem aylığı;
		if (hizmet_yili > 25) { 
			hizmet_yili = 25;
		}
		var kidem_ayligi_tutar = parseFloat(20 * hizmet_yili * aylik_gosterge).toFixed(2);
		// yan ödeme aylığı
		var ozel_hizmet_oran;
		var ek_odeme_oran;
		var yan_odeme_oran;
		if (unvan == 1 || unvan == 4 || unvan == 5 || unvan == 12 ) {  // YİM, İc.Md., İc.Md.Y.
			ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_mudur'];
			ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mudur'];	
			yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_mudur'];			

				if (unvan == 5) {  // Eğer İcra Müdür Yardımcısıysa
					ozel_hizmet_oran = (ozel_hizmet_oran * 1) - 5;
					ek_odeme_oran = (ek_odeme_oran * 1) - 5;
						if (ozel_hizmet_oran > 125) { // 1-2 derece 10 puan aşağısı, sonra 5 puan aşağısı olduğundan 5 puan daha düşülüyor
							ozel_hizmet_oran = (ozel_hizmet_oran * 1) - 5;
						}	
				}
		} else if (unvan == 2) { // Katip
			ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_katip'];
			ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_katip'];	
			yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_katip'];					
		} else if (unvan == 13 || unvan == 14 || unvan == 15 || unvan == 16) { // IKM
			ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_ikm'];
			ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_katip'];	
			yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_katip'];		
			
			ozel_hizmet_oran = (ozel_hizmet_oran * 1) + 10;
			yan_odeme_oran = (yan_odeme_oran * 1) + 400;

			if (unvan == 15 || unvan == 16) {
				yan_odeme_oran = (yan_odeme_oran * 1) + 200;
			}

			if (unvan == 14 || unvan == 16) {
				ozel_hizmet_oran = (ozel_hizmet_oran * 1) + 3;
			}
			

		} else if (unvan == 3 || unvan ==6 || unvan ==7 ) {  // Mübaşir, İcra Katibi, Cezaevi Katibi
			ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_mubasir'];	
			ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mubasir'];
			yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_mubasir'];	
				if (unvan == 7) {
					yan_odeme_oran = (yan_odeme_oran * 1) + 400;
					ozel_hizmet_oran = (ozel_hizmet_oran * 1) - 7;
				}	
		} else if ( unvan == 8 || unvan == 9) {  // silahlı silahsız güvenlik
			ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_guvenlik'];	
			ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mubasir'];
			yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_mubasir'];	

			yan_odeme_oran = (yan_odeme_oran * 1) - 25;
			ek_odeme_oran = (ek_odeme_oran * 1) + 13;		

			if ( unvan == 9) {
				ek_odeme_oran = (ek_odeme_oran * 1) + 5;
			}

		} else if ( unvan == 10 || unvan == 11) {  // cezaevi müdürü
			ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_mudur'];	
			ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mudur'];
			yan_odeme_oran = '2500';	
		

			if ( unvan == 11) {
				yan_odeme_oran = '2700';
				ek_odeme_oran = (ek_odeme_oran * 1) + 13;
			}

			if ( unvan == 10) {
				ek_odeme_oran = (ek_odeme_oran * 1) + 10;
			}
		}	



		if (tasiniryetkili > 0) { 
			yan_odeme_oran = (yan_odeme_oran * 1) + (tasiniryetkili * 1);
		}

		var yan_odeme_tutar = parseFloat(yan_odeme_oran * yan_odeme_katsayisi).toFixed(2);
		
		// aile yardımı eş
		var es_yardimi_tutar = parseFloat(medeni_durum * aylik_gosterge).toFixed(2);
		// çocuk yardımı
		var cocuk_yardim_tutar = parseFloat(((cocuk72aydankucuk * 500) + (cocuk72aydanbuyuk * 250) + (engellicocuk72aydankucuk * 750) + (engellicocuk72aydanbuyuk * 375)) * aylik_gosterge).toFixed(2);
		// özel hizmet tazminatı			
		var ozel_hizmet_tutar = parseFloat(9500 * aylik_gosterge * ozel_hizmet_oran / 100).toFixed(2);		
		// ek ödeme
		var ek_odeme_tutar = parseFloat(9500 * aylik_gosterge * ek_odeme_oran / 100).toFixed(2);
		// il adalet hizmetleri tazminatı
		var il_adalet_hizmetleri_tazminat_tutar	= parseFloat(9500 * aylik_gosterge * gorevyeri / 100).toFixed(2);
		// sendika ödemesi
		if ($('#sendikauye').val() > 0) { 
			var sendika_ikramiye_tutar = parseFloat(aylik_gosterge * sendikaikramiye * sendikauye).toFixed(2);
		} else {
			var sendika_ikramiye_tutar = parseFloat(aylik_gosterge * sendikaikramiye * 0).toFixed(2);	
		}

		if ($('#kadroderece').val() > 0) { 
			sendika_ikramiye_tutar = parseFloat(sendika_ikramiye_tutar * 0).toFixed(2);
		}
		
		// dil tazminatı
		var dil_tazminat_tutar = parseFloat(aylik_gosterge * yabancidil).toFixed(2);
		// seyyanen zam
		var seyyanen_zam =  parseFloat(15965 * aylik_gosterge).toFixed(2);
		
		var artilartoplam = (dil_tazminat_tutar * 1) + (sendika_ikramiye_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1) + (ek_odeme_tutar * 1) + (ozel_hizmet_tutar * 1) + (cocuk_yardim_tutar * 1) + (es_yardimi_tutar * 1) + (yan_odeme_tutar * 1) + (kidem_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (gosterge_ayligi_tutar *1)+ (seyyanen_zam *1);
		
		// ## GİDERLER ## //
		// sendika kesintisi
		if ($('#sendikauye').val() > 0) { 
			var sendika_kesinti_tutar = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (yan_odeme_tutar * 1) + (ozel_hizmet_tutar * 1) + (sendika_ikramiye_tutar * 1) + (ek_odeme_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1) + (seyyanen_zam * 1)) * 0.005);
		} else { 
			var sendika_kesinti_tutar = 0;
		}
		
		// gelir vergisi
		var gelir_vergisi = parseFloat(((gelir_vergisi_istisna * 1) - (((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (yan_odeme_tutar * 1) + (sendika_ikramiye_tutar * 1) - (sendika_kesinti_tutar * 1)) * 15 / 100))).toFixed(2);
		if (gelir_vergisi * 1 > 0) { 
			gelir_vergisi = 0.00;
		} else { 
			gelir_vergisi = gelir_vergisi * -1;
		}
		
		
		
		// damga vergisi 
		var damga_vergisi = parseFloat((damga_vergisi_istisna * 1) - (((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (yan_odeme_tutar * 1) + (ozel_hizmet_tutar * 1) + (ek_odeme_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1) + (sendika_ikramiye_tutar * 1) + (seyyanen_zam * 1)) * 7.59 / 1000)).toFixed(2);
		if (damga_vergisi * 1 > 0) { 
			damga_vergisi = 0.00;
		} else { 
			damga_vergisi = damga_vergisi * -1;
		}
		// Em.Kes.Karşılığı - Devlet
		var em_kes_kisi;
		var gss_primi = 0;
		
		var ozel_hizmet_orani;
		
		if (ek_gosterge_ayligi * 1 >= 3600) { 
			ozel_hizmet_oran = 1.45;
		} else if (ek_gosterge_ayligi * 1 >= 2200) { 
			ozel_hizmet_oran = 0.85;
		} else { 
			ozel_hizmet_oran = 0.55;
		}		
		
		
		var bes_kesinti = 0;		
		
		if (tabikanun == 1) {  // bana göre
			em_kes_kisi = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ozel_hizmet_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1)) * 9 / 100).toFixed(2);
			gss_primi = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ozel_hizmet_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1)) * 5 / 100).toFixed(2);
			
			if (bes_uye_mi == 1) {  
				bes_kesinti = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ozel_hizmet_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1)) * 3 / 100).toFixed(0);
			}	
		} else if (tabikanun == 2) { // ihsan müdüre göre
			em_kes_kisi = parseFloat(((gosterge_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1)  + (9500 * aylik_gosterge * ozel_hizmet_oran)) * 16 / 100).toFixed(2);
			
			if (bes_uye_mi == 1) {  
				bes_kesinti = parseFloat(((gosterge_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1)  + (9500 * aylik_gosterge * ozel_hizmet_oran)) * 3 / 100).toFixed(0);
			}
		}
		
		
		

		var eksilertoplam = parseFloat((sendika_kesinti_tutar * 1) + (gelir_vergisi * 1) + (damga_vergisi * 1) + (em_kes_kisi * 1) + (gss_primi * 1) + (haciz_miktar * 1) + (bes_kesinti * 1)).toFixed(2);
		
		net_maas = (artilartoplam * 1) - (eksilertoplam *1);
		var fark_maas = net_maas * (100 + (fark_artis *1)) / 100;
		var toplu_soz_maas = fark_maas * (100 + (toplu_soz_artis * 1)) / 100;
		var toplu_soz_maas2 = toplu_soz_maas * (100 + (toplu_soz_artis2 * 1)) / 100;
		var toplu_soz_maas3 = toplu_soz_maas2 * (100 + (toplu_soz_artis3 * 1)) / 100;
		var toplu_soz_maas4 = toplu_soz_maas3 * (100 + (toplu_soz_artis4 * 1)) / 100;
		if ($('#hesaplama').val() > 0) { 
			$("#hesapsonuchtml").html('<div  class="mb-12"><div class="row"><div class="mb-12 bg-success text-white">Gelirler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>İstihaklar</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gösterge Aylığı</td><td>' + gosterge_ayligi +'</td><td>' + gosterge_ayligi_tutar +'</td></tr><tr><td>Ek Gösterge Aylığı</td><td>' + ek_gosterge_ayligi +'</td><td>' + ek_gosterge_ayligi_tutar +'</td></tr><tr><td>Taban Aylığı</td><td>' + '1000' + '</td><td>' + taban_ayligi_tutar + '</td></tr><tr><td>Kıdem Aylığı</td><td>' + hizmet_yili + '</td><td>' + kidem_ayligi_tutar + '</td></tr><tr><td>Yan Ödeme Aylığı</td><td>' + yan_odeme_oran + '</td><td>' + yan_odeme_tutar + '</td></tr><tr><td>Aile Yardımı (Eş)</td><td>' + medeni_durum + '</td><td>' + es_yardimi_tutar + '</td></tr><tr><td>Aile Yardımı (Çocuk)</td><td>-</td><td>' + cocuk_yardim_tutar + '</td></tr><tr><td>Özel Hizmet Tazminatı</td><td>' + ozel_hizmet_oran + '</td><td>' + ozel_hizmet_tutar + '</td></tr><tr><td>Ek Ödeme</td><td>' + ek_odeme_oran + '</td><td>' + ek_odeme_tutar + '</td></tr><tr><td>İl Adalet Hizmetleri Tazminatı</td><td>' + gorevyeri + '</td><td>' + il_adalet_hizmetleri_tazminat_tutar + '</td></tr><tr><td>Toplu Sözleşme İkramiyesi</td><td>' + sendikaikramiye * sendikauye + '</td><td>' + sendika_ikramiye_tutar + '</td></tr><tr><td>Dil Tazminatı</td><td>' + yabancidil + '</td><td>' + dil_tazminat_tutar + '</td></tr><tr><td>375 SK EK Madde 40</td><td>' + 15965 + '</td><td>' + seyyanen_zam + '</td></tr></tbody></table></div></div><div class="mb-3 bg-danger text-white">Kesintiler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Kesintiler</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gelir Vergisi</td><td>%15</td><td>' + gelir_vergisi + '</td></tr><tr><td>Damga Vergisi</td><td>7,59</td><td>' + damga_vergisi + '</td></tr><tr><td>Em.Kes.Karşılığı</td><td></td><td>' + em_kes_kisi + '</td></tr><tr><td>GSS Primi</td><td></td><td>' + gss_primi + '</td></tr><tr><td>Sendika Kesintisi</td><td>%0.50</td><td>' + sendika_kesinti_tutar.toFixed(2) + '</td></tr><tr><td>BES Kesintisi</td><td>%3</td><td>' + bes_kesinti + '</td></tr><tr><td>Haciz Kesintisi</td><td>%4,55</td><td>' + haciz_miktar + '</td></tr></tbody></table></div><div class="mb-3 bg-info text-white">Toplam</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Toplam</th><th></th><th>Tutar</th></tr></thead><tbody><tr><td>İstihaklar Toplamı</td><td></td><td>' + artilartoplam.toFixed(2) + ' ₺</td></tr><tr><td>Kesintiler Toplamı</td><td></td><td>-' + eksilertoplam + ' ₺</td></tr><tr><th id="hesaplanannetmaas" name="hesaplanannetmaas" class="text-success">Net Maaş</th><td></td><td class="font-weight-bold text-success">' + net_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-indigo">%' + fark_artis + ' Enflasyon farkı Ekli Net Maaş</td><td></td><td>' + fark_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">%' + fark_artis + ' Enflasyon farkı ve Ocak 2024 %' + toplu_soz_artis + ' sonrası</td><td></td><td>' + toplu_soz_maas.toFixed(2) + ' ₺</td></tr></tbody></table></div></div>');
	    } else {
			$("#hesapsonuchtml").html('<div  class="mb-12"><div class="row"><div class="mb-12 bg-success text-white">Gelirler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>İstihaklar</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gösterge Aylığı</td><td>' + gosterge_ayligi +'</td><td>' + gosterge_ayligi_tutar +'</td></tr><tr><td>Ek Gösterge Aylığı</td><td>' + ek_gosterge_ayligi +'</td><td>' + ek_gosterge_ayligi_tutar +'</td></tr><tr><td>Taban Aylığı</td><td>' + '1000' + '</td><td>' + taban_ayligi_tutar + '</td></tr><tr><td>Kıdem Aylığı</td><td>' + hizmet_yili + '</td><td>' + kidem_ayligi_tutar + '</td></tr><tr><td>Yan Ödeme Aylığı</td><td>' + yan_odeme_oran + '</td><td>' + yan_odeme_tutar + '</td></tr><tr><td>Aile Yardımı (Eş)</td><td>' + medeni_durum + '</td><td>' + es_yardimi_tutar + '</td></tr><tr><td>Aile Yardımı (Çocuk)</td><td>-</td><td>' + cocuk_yardim_tutar + '</td></tr><tr><td>Özel Hizmet Tazminatı</td><td>' + ozel_hizmet_oran + '</td><td>' + ozel_hizmet_tutar + '</td></tr><tr><td>Ek Ödeme</td><td>' + ek_odeme_oran + '</td><td>' + ek_odeme_tutar + '</td></tr><tr><td>İl Adalet Hizmetleri Tazminatı</td><td>' + gorevyeri + '</td><td>' + il_adalet_hizmetleri_tazminat_tutar + '</td></tr><tr><td>Toplu Sözleşme İkramiyesi</td><td>' + sendikaikramiye * sendikauye + '</td><td>' + sendika_ikramiye_tutar + '</td></tr><tr><td>Dil Tazminatı</td><td>' + yabancidil + '</td><td>' + dil_tazminat_tutar + '</td></tr><tr><td>375 SK EK Madde 40</td><td>' + 15965 + '</td><td>' + seyyanen_zam + '</td></tr></tbody></table></div></div><div class="mb-3 bg-danger text-white">Kesintiler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Kesintiler</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gelir Vergisi</td><td>%15</td><td>' + gelir_vergisi + '</td></tr><tr><td>Damga Vergisi</td><td>7,59</td><td>' + damga_vergisi + '</td></tr><tr><td>Em.Kes.Karşılığı</td><td></td><td>' + em_kes_kisi + '</td></tr><tr><td>GSS Primi</td><td></td><td>' + gss_primi + '</td></tr><tr><td>Sendika Kesintisi</td><td>%0.50</td><td>' + sendika_kesinti_tutar.toFixed(2) + '</td></tr><tr><td>BES Kesintisi</td><td>%3</td><td>' + bes_kesinti + '</td></tr><tr><td>Haciz Kesintisi</td><td>%4,55</td><td>' + haciz_miktar + '</td></tr></tbody></table></div><div class="mb-3 bg-info text-white">Toplam</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Toplam</th><th>Tutar</th><th></th></tr></thead><tbody><tr><td>İstihaklar Toplamı</td><td></td><td>' + artilartoplam.toFixed(2) + ' ₺</td></tr><tr><td>Kesintiler Toplamı</td><td></td><td>-' + eksilertoplam + ' ₺</td></tr><tr><th id="hesaplanannetmaas" name="hesaplanannetmaas" class="text-success">Net Maaş</th><td></td><td class="font-weight-bold text-success">' + net_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-indigo">%' + fark_artis + ' Enflasyon farkı Ekli Net Maaş</td><td></td><td>' + fark_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">%' + fark_artis + ' Enflasyon farkı ve Ocak 2024 %' + toplu_soz_artis + ' sonrası</td><td></td><td>' + toplu_soz_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">%' + fark_artis + ' Enflasyon farkı ve Temmuz 2024 teklifi: %' + toplu_soz_artis2 + ' sonrası </td><td></td><td>' + toplu_soz_maas2.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">%' + fark_artis + ' Enflasyon farkı ve Ocak 2025 teklifi: %' + toplu_soz_artis3 + ' sonrası </td><td></td><td>' + toplu_soz_maas3.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">%' + fark_artis + ' Enflasyon farkı ve Temmuz 2025 teklifi: %' + toplu_soz_artis4 + ' sonrası </td><td></td><td>' + toplu_soz_maas4.toFixed(2) + ' ₺</td></tr></tbody></table></div></div>');
		}
		
		
		scrollToBottom();
}

function yenimaashesapla(){
	if ($('#hesaplama').val() > 0) {
		var aylik_gosterge = window.katsayilar[9].aylik_katsayi / 30 * 14;		
		var taban_ayligi_katsayisi = window.katsayilar[9].taban_ayligi_katsayi / 30 * 14;
		var yan_odeme_katsayisi = window.katsayilar[9].yan_odeme_katsayi / 30 * 14;
		var gelir_vergisi_istisna = window.katsayilar[9].gelir_vergisi_istisna / 30 * 14;
		var damga_vergisi_istisna = window.katsayilar[9].damga_vergisi_istisna / 30 * 14;
		var son_artis = window.katsayilar[9].enflasyon;

	} else { 

		var aylik_gosterge = window.katsayilar[0].aylik_katsayi;		
		var taban_ayligi_katsayisi = window.katsayilar[0].taban_ayligi_katsayi;
		var yan_odeme_katsayisi = window.katsayilar[0].yan_odeme_katsayi;
		var gelir_vergisi_istisna = window.katsayilar[0].gelir_vergisi_istisna;
		var damga_vergisi_istisna = window.katsayilar[0].damga_vergisi_istisna;
		var son_artis = window.katsayilar[1].enflasyon;
	}
	
	var fark_artis = window.katsayilar[2].enflasyon;		
	var toplu_soz_artis = window.katsayilar[3].enflasyon;
	var toplu_soz_artis2 = window.katsayilar[4].enflasyon;
	var toplu_soz_artis3 = window.katsayilar[5].enflasyon;
	var toplu_soz_artis4 = window.katsayilar[6].enflasyon;
	// formdaki veriler 
	var unvan = $('#unvan').val();
	var kadro_derece = $('#kadroderece').val();
	var hizmet_yili = $('input[name="hizmetyili"]').val();
	var medeni_durum = $('#medenidurum').val();
	var mezuniyet = $('#mezuniyet').val();
	var cocuk72aydankucuk = $('#cocuk72aydankucuk').val();
	var cocuk72aydanbuyuk = $('#cocuk72aydanbuyuk').val();
	var engellicocuk72aydankucuk = $('#engellicocuk72aydankucuk').val();
	var engellicocuk72aydanbuyuk = $('#engellicocuk72aydanbuyuk').val();
	var sendikauye = 707; 
	var tasiniryetkili = $('#tasiniryetkili').val();
	/*
		2024 Ocak sonrası 
		var sendikauye = 707; 
		
	*/
	var gorevyeri = $('#gorevyeri').val();
	var yabancidil = $('#yabancidil').val();
	var tabikanun = $('#tabikanun').val();
	var sendikaikramiye = 1;
	/*
		2024 Ocak sonrası 
		var sendikaikramiye = 1;
		
		## maas.php den bu ay toplu sözleşme alınacak mı silinecek
	*/	
	var ilgili_derece_bilgileri = getGosterge(kadro_derece);
	var bes_uye_mi = $('#beskesintisi').val();
	var haciz = $('#haciz').val();
	
	// ## GELİRLER ## //
	// gösterge aylığı
	var gosterge_ayligi = ilgili_derece_bilgileri['gosterge'];
	var gosterge_ayligi_tutar = parseFloat(aylik_gosterge * gosterge_ayligi).toFixed(2);
	// ek gösterge
	var ek_gosterge_ayligi;
	var haciz_miktar;
	
	if (haciz > 0) {
		haciz_miktar = parseFloat(haciz * 1.0455).toFixed(2);
	} else {
		haciz_miktar = 0;
	}
	
	if (unvan == 1 || unvan == 4 || unvan == 5 || unvan == 10 || unvan == 11 || unvan == 12) {  // Yim , İcra Müdürü, İc.Md.Y.
		ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_mudur'];		
	} else {  
		if (mezuniyet == 1) { 
			ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_uni'];
		} else { 
			ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_digerleri'];
		}
	}		
	var ek_gosterge_ayligi_tutar = parseFloat(ek_gosterge_ayligi * aylik_gosterge).toFixed(2);		
	// taban aylık
	var taban_ayligi_tutar = parseFloat(1000 * taban_ayligi_katsayisi).toFixed(2);
	// kıdem aylığı;
	if (hizmet_yili > 25) { 
		hizmet_yili = 25;
	}
	var kidem_ayligi_tutar = parseFloat(20 * hizmet_yili * aylik_gosterge).toFixed(2);
	// yan ödeme aylığı
	var ozel_hizmet_oran;
	var ek_odeme_oran;
	var yan_odeme_oran;

	
	if (unvan == 1 || unvan == 4 || unvan == 5 || unvan == 12 ) {  // YİM, İc.Md., İc.Md.Y.
		ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_mudur'];
		ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mudur'];	
		yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_mudur'];

		/*
			2024 Ocak ayı itibariyle yeni formül
			ozel_hizmet_oran =  (ozel_hizmet_oran * 1) + 20;
		*/

		if (unvan == 5) {  // Eğer İcra Müdür Yardımcısıysa
			ozel_hizmet_oran = (ozel_hizmet_oran * 1) - 5;
			ek_odeme_oran = (ek_odeme_oran * 1) - 5;
				if (ozel_hizmet_oran > 125) { // 1-2 derece 10 puan aşağısı, sonra 5 puan aşağısı olduğundan 5 puan daha düşülüyor
					ozel_hizmet_oran = (ozel_hizmet_oran * 1) - 5;
				}	
		}
		
		if (unvan == 1 || unvan == 4 || unvan == 5 || unvan == 12 ) { 
			ozel_hizmet_oran =  (ozel_hizmet_oran * 1) + 20;
		} else { 
			ozel_hizmet_oran =  (ozel_hizmet_oran * 1) + 15;
		}		

		
	} else if (unvan == 2) { // Katip
		ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_katip'];
		ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_katip'];	
		yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_katip'];					
	} else if (unvan == 13 || unvan == 14 || unvan == 15 || unvan == 16) { // İKM
		ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_ikm'];
		ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_katip'];	
		yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_katip'];		
		
		ozel_hizmet_oran = (ozel_hizmet_oran * 1) + 10;
		yan_odeme_oran = (yan_odeme_oran * 1) + 400;

		if (unvan == 14 || unvan == 16) {
			ozel_hizmet_oran = (ozel_hizmet_oran * 1) + 3;
		}

		if (unvan == 15 || unvan == 16) {
			yan_odeme_oran = (yan_odeme_oran * 1) + 200;
		}
		

	} else if (unvan == 3 || unvan ==6 || unvan ==7) {  // Mübaşir, İcra Katibi, Cezaevi Katibi
		ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_tazminat_mubasir'];	
		ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mubasir'];
		yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_mubasir'];	
			if (unvan == 7) {
				yan_odeme_oran = (yan_odeme_oran * 1) + 400;
				ozel_hizmet_oran = (ozel_hizmet_oran * 1) - 7;
			}
			
	} else if ( unvan == 8 || unvan == 9) {  // silahlı silahsız güvenlik
		ozel_hizmet_oran = ilgili_derece_bilgileri['ozel_hizmet_guvenlik'];	
		ek_odeme_oran = ilgili_derece_bilgileri['ek_odeme_ayligi_mubasir'];
		yan_odeme_oran = 	ilgili_derece_bilgileri['yan_odeme_mubasir'];	

		yan_odeme_oran = (yan_odeme_oran * 1) - 25;
		ek_odeme_oran = (ek_odeme_oran * 1) + 23;		

		if ( unvan == 9) {
			ek_odeme_oran = (ek_odeme_oran * 1) + 5;
		}

	}
	
	if (tasiniryetkili > 0) { 
		yan_odeme_oran = (yan_odeme_oran * 1) + (tasiniryetkili * 1);
	}

	var yan_odeme_tutar = parseFloat(yan_odeme_oran * yan_odeme_katsayisi).toFixed(2);

	
	
	// aile yardımı eş
	var es_yardimi_tutar = parseFloat(medeni_durum * aylik_gosterge).toFixed(2);
	// çocuk yardımı
	var cocuk_yardim_tutar = parseFloat(((cocuk72aydankucuk * 500) + (cocuk72aydanbuyuk * 250) + (engellicocuk72aydankucuk * 750) + (engellicocuk72aydanbuyuk * 375)) * aylik_gosterge).toFixed(2);
	// özel hizmet tazminatı			
	var ozel_hizmet_tutar = parseFloat(9500 * aylik_gosterge * ozel_hizmet_oran / 100).toFixed(2);		
	// ek ödeme
	var ek_odeme_tutar = parseFloat(9500 * aylik_gosterge * ek_odeme_oran / 100).toFixed(2);
	// il adalet hizmetleri tazminatı
	var il_adalet_hizmetleri_tazminat_tutar	= parseFloat(9500 * aylik_gosterge * gorevyeri / 100).toFixed(2);
	// sendika ödemesi
	if ($('#sendikauye').val() > 0) { 
		var sendika_ikramiye_tutar = parseFloat(aylik_gosterge * sendikaikramiye * sendikauye).toFixed(2);
	} else {
		var sendika_ikramiye_tutar = parseFloat(aylik_gosterge * sendikaikramiye * 0).toFixed(2);	
	}

	if ($('#hesaplama').val() > 0) { 
		sendika_ikramiye_tutar = parseFloat(sendika_ikramiye_tutar * 0).toFixed(2);	
	}
	// dil tazminatı
	var dil_tazminat_tutar = parseFloat(aylik_gosterge * yabancidil).toFixed(2);
	// seyyanen zam
	var seyyanen_zam =  parseFloat(15965 * aylik_gosterge).toFixed(2);
	
	var artilartoplam = (dil_tazminat_tutar * 1) + (sendika_ikramiye_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1) + (ek_odeme_tutar * 1) + (ozel_hizmet_tutar * 1) + (cocuk_yardim_tutar * 1) + (es_yardimi_tutar * 1) + (yan_odeme_tutar * 1) + (kidem_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (gosterge_ayligi_tutar *1)+ (seyyanen_zam *1);
	
	// ## GİDERLER ## //
	// sendika kesintisi
	if ($('#sendikauye').val() > 0) { 
		var sendika_kesinti_tutar = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (yan_odeme_tutar * 1) + (ozel_hizmet_tutar * 1) + (sendika_ikramiye_tutar * 1) + (ek_odeme_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1) + (seyyanen_zam * 1)) * 0.005);
	} else { 
		var sendika_kesinti_tutar = 0;
	}
	
	// gelir vergisi
	var gelir_vergisi = parseFloat(((gelir_vergisi_istisna * 1) - (((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (yan_odeme_tutar * 1) + (sendika_ikramiye_tutar * 1) - (sendika_kesinti_tutar * 1)) * 15 / 100))).toFixed(2);
	if (gelir_vergisi * 1 > 0) { 
		gelir_vergisi = 0.00;
	} else { 
		gelir_vergisi = gelir_vergisi * -1;
	}
	
	
	
	// damga vergisi 
	var damga_vergisi = parseFloat((damga_vergisi_istisna * 1) - (((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (yan_odeme_tutar * 1) + (ozel_hizmet_tutar * 1) + (ek_odeme_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1) + (sendika_ikramiye_tutar * 1) + (seyyanen_zam * 1)) * 7.59 / 1000)).toFixed(2);
	if (damga_vergisi * 1 > 0) { 
		damga_vergisi = 0.00;
	} else { 
		damga_vergisi = damga_vergisi * -1;
	}
	// Em.Kes.Karşılığı - Devlet
	var em_kes_kisi;
	var gss_primi = 0;
	
	var ozel_hizmet_orani;
	
	if (ek_gosterge_ayligi * 1 >= 3600) { 
		ozel_hizmet_oran = 1.45;
	} else if (ek_gosterge_ayligi * 1 >= 2200) { 
		ozel_hizmet_oran = 0.85;
	} else { 
		ozel_hizmet_oran = 0.55;
	}
	
	
	var bes_kesinti = 0;		
	
	if (tabikanun == 1) {  // bana göre
		em_kes_kisi = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ozel_hizmet_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1)) * 9 / 100).toFixed(2);
		gss_primi = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ozel_hizmet_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1)) * 5 / 100).toFixed(2);
		
		if (bes_uye_mi == 1) {  
			bes_kesinti = parseFloat(((gosterge_ayligi_tutar *1) + (ek_gosterge_ayligi_tutar *1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ozel_hizmet_tutar * 1) + (il_adalet_hizmetleri_tazminat_tutar * 1)) * 3 / 100).toFixed(0);
		}	
	} else if (tabikanun == 2) { // ihsan müdüre göre
		em_kes_kisi = parseFloat(((gosterge_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1)  + (9500 * aylik_gosterge * ozel_hizmet_oran)) * 16 / 100).toFixed(2);
		
		if (bes_uye_mi == 1) {  
			bes_kesinti = parseFloat(((gosterge_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1)  + (9500 * aylik_gosterge * ozel_hizmet_oran)) * 3 / 100).toFixed(0);
		}
	}	
	
	

	var eksilertoplam = parseFloat((sendika_kesinti_tutar * 1) + (gelir_vergisi * 1) + (damga_vergisi * 1) + (em_kes_kisi * 1) + (gss_primi * 1) + (haciz_miktar * 1) + (bes_kesinti * 1)).toFixed(2);
	
	net_maas = (artilartoplam * 1) - (eksilertoplam *1);
	var fark_maas = net_maas * (100 + (fark_artis *1)) / 100;
	var toplu_soz_maas = fark_maas * (100 + (toplu_soz_artis * 1)) / 100;
	var toplu_soz_maas2 = net_maas * (100 + (toplu_soz_artis2 * 1)) / 100;
	var toplu_soz_maas3 = toplu_soz_maas2 * (100 + (toplu_soz_artis3 * 1)) / 100;
	var toplu_soz_maas4 = toplu_soz_maas3 * (100 + (toplu_soz_artis4 * 1)) / 100;
	
	if ($('#hesaplama').val() > 0) {
		$("#hesapsonuchtml").html('<div  class="mb-12"><div class="row"><div class="mb-12 bg-success text-white">Gelirler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>İstihaklar</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gösterge Aylığı</td><td>' + gosterge_ayligi +'</td><td>' + gosterge_ayligi_tutar +'</td></tr><tr><td>Ek Gösterge Aylığı</td><td>' + ek_gosterge_ayligi +'</td><td>' + ek_gosterge_ayligi_tutar +'</td></tr><tr><td>Taban Aylığı</td><td>' + '1000' + '</td><td>' + taban_ayligi_tutar + '</td></tr><tr><td>Kıdem Aylığı</td><td>' + hizmet_yili + '</td><td>' + kidem_ayligi_tutar + '</td></tr><tr><td>Yan Ödeme Aylığı</td><td>' + yan_odeme_oran + '</td><td>' + yan_odeme_tutar + '</td></tr><tr><td>Aile Yardımı (Eş)</td><td>' + medeni_durum + '</td><td>' + es_yardimi_tutar + '</td></tr><tr><td>Aile Yardımı (Çocuk)</td><td>-</td><td>' + cocuk_yardim_tutar + '</td></tr><tr><td>Özel Hizmet Tazminatı</td><td>' + ozel_hizmet_oran + '</td><td>' + ozel_hizmet_tutar + '</td></tr><tr><td>Ek Ödeme</td><td>' + ek_odeme_oran + '</td><td>' + ek_odeme_tutar + '</td></tr><tr><td>İl Adalet Hizmetleri Tazminatı</td><td>' + gorevyeri + '</td><td>' + il_adalet_hizmetleri_tazminat_tutar + '</td></tr><tr><td>Toplu Sözleşme İkramiyesi</td><td>' + sendikaikramiye * sendikauye + '</td><td>' + sendika_ikramiye_tutar + '</td></tr><tr><td>Dil Tazminatı</td><td>' + yabancidil + '</td><td>' + dil_tazminat_tutar + '</td></tr><tr><td>375 SK EK Madde 40</td><td>' + 15965 + '</td><td>' + seyyanen_zam + '</td></tr></tbody></table></div></div><div class="mb-3 bg-danger text-white">Kesintiler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Kesintiler</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gelir Vergisi</td><td>%15</td><td>' + gelir_vergisi + '</td></tr><tr><td>Damga Vergisi</td><td>7,59</td><td>' + damga_vergisi + '</td></tr><tr><td>Em.Kes.Karşılığı</td><td></td><td>' + em_kes_kisi + '</td></tr><tr><td>GSS Primi</td><td></td><td>' + gss_primi + '</td></tr><tr><td>Sendika Kesintisi</td><td>%0.50</td><td>' + sendika_kesinti_tutar.toFixed(2) + '</td></tr><tr><td>BES Kesintisi</td><td>%3</td><td>' + bes_kesinti + '</td></tr><tr><td>Haciz Kesintisi</td><td>%4,55</td><td>' + haciz_miktar + '</td></tr></tbody></table></div><div class="mb-3 bg-info text-white">Toplam</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Toplam</th><th>Tutar</th><th></th></tr></thead><tbody><tr><td>İstihaklar Toplamı</td><td></td><td>' + artilartoplam.toFixed(2) + ' ₺</td></tr><tr><td>Kesintiler Toplamı</td><td></td><td>-' + eksilertoplam + ' ₺</td></tr><tr><th id="hesaplanannetmaas" name="hesaplanannetmaas" class="text-success">Net Maaş</th><td></td><td class="font-weight-bold text-success">' + net_maas.toFixed(2) + ' ₺</td></tr></tbody></table></div></div>');

	} else { 
		$("#hesapsonuchtml").html('<div  class="mb-12"><div class="row"><div class="mb-12 bg-success text-white">Gelirler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>İstihaklar</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gösterge Aylığı</td><td>' + gosterge_ayligi +'</td><td>' + gosterge_ayligi_tutar +'</td></tr><tr><td>Ek Gösterge Aylığı</td><td>' + ek_gosterge_ayligi +'</td><td>' + ek_gosterge_ayligi_tutar +'</td></tr><tr><td>Taban Aylığı</td><td>' + '1000' + '</td><td>' + taban_ayligi_tutar + '</td></tr><tr><td>Kıdem Aylığı</td><td>' + hizmet_yili + '</td><td>' + kidem_ayligi_tutar + '</td></tr><tr><td>Yan Ödeme Aylığı</td><td>' + yan_odeme_oran + '</td><td>' + yan_odeme_tutar + '</td></tr><tr><td>Aile Yardımı (Eş)</td><td>' + medeni_durum + '</td><td>' + es_yardimi_tutar + '</td></tr><tr><td>Aile Yardımı (Çocuk)</td><td>-</td><td>' + cocuk_yardim_tutar + '</td></tr><tr><td>Özel Hizmet Tazminatı</td><td>' + ozel_hizmet_oran + '</td><td>' + ozel_hizmet_tutar + '</td></tr><tr><td>Ek Ödeme</td><td>' + ek_odeme_oran + '</td><td>' + ek_odeme_tutar + '</td></tr><tr><td>İl Adalet Hizmetleri Tazminatı</td><td>' + gorevyeri + '</td><td>' + il_adalet_hizmetleri_tazminat_tutar + '</td></tr><tr><td>Toplu Sözleşme İkramiyesi</td><td>' + sendikaikramiye * sendikauye + '</td><td>' + sendika_ikramiye_tutar + '</td></tr><tr><td>Dil Tazminatı</td><td>' + yabancidil + '</td><td>' + dil_tazminat_tutar + '</td></tr><tr><td>375 SK EK Madde 40</td><td>' + 15965 + '</td><td>' + seyyanen_zam + '</td></tr></tbody></table></div></div><div class="mb-3 bg-danger text-white">Kesintiler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Kesintiler</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gelir Vergisi</td><td>%15</td><td>' + gelir_vergisi + '</td></tr><tr><td>Damga Vergisi</td><td>7,59</td><td>' + damga_vergisi + '</td></tr><tr><td>Em.Kes.Karşılığı</td><td></td><td>' + em_kes_kisi + '</td></tr><tr><td>GSS Primi</td><td></td><td>' + gss_primi + '</td></tr><tr><td>Sendika Kesintisi</td><td>%0.50</td><td>' + sendika_kesinti_tutar.toFixed(2) + '</td></tr><tr><td>BES Kesintisi</td><td>%3</td><td>' + bes_kesinti + '</td></tr><tr><td>Haciz Kesintisi</td><td>%4,55</td><td>' + haciz_miktar + '</td></tr></tbody></table></div><div class="mb-3 bg-info text-white">Toplam</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Toplam</th><th>Tutar</th><th></th></tr></thead><tbody><tr><td>İstihaklar Toplamı</td><td></td><td>' + artilartoplam.toFixed(2) + ' ₺</td></tr><tr><td>Kesintiler Toplamı</td><td></td><td>-' + eksilertoplam + ' ₺</td></tr><tr><th id="hesaplanannetmaas" name="hesaplanannetmaas" class="text-success">Net Maaş</th><td></td><td class="font-weight-bold text-success">' + net_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">Temmuz 2024 %' + toplu_soz_artis2 + ' sonrası </td><td></td><td>' + toplu_soz_maas2.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">Ocak 2025 %' + toplu_soz_artis3 + ' sonrası </td><td></td><td>' + toplu_soz_maas3.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">Temmuz 2025 %' + toplu_soz_artis4 + ' sonrası </td><td></td><td>' + toplu_soz_maas4.toFixed(2) + ' ₺</td></tr></tbody></table></div></div>');
	}
	
	scrollToBottom();

}




function hesapla(x, y){
	maktuharc = 179.90;	
	
	if (x == null) { 
		x = 0.00;
	}
	
	x = parseFloat(x * 68.31);
	
	if (y == false) { 
		z = parseFloat(x / 4000);		
	} else { 
		z = parseFloat(x / 20000);
	}
	
	if (z == 0) {
		sonuc = 0
	} else if (z < maktuharc) { 
		sonuc = maktuharc;
	} else { 
		sonuc = z;
	}	
	return sonuc;
}

function gunlericevir(x) { 
	var dateParts = x.split("/");
	var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
	
	return dateObject;

}

function gunleridus() { 
	var sayi = 0;
	var sayiiki = 0;	

	let uniqueChars = [];
	
	if (izindates.length > 0) { 		
		farkdates.forEach((element) => {
		if (!izindates.includes(element)) {
			uniqueChars.push(element);
		}
		});
	} else { 
		uniqueChars = farkdates;
	}
	
	return uniqueChars.length;
}

function getDates (startDate, endDate) {
	  const dates = []
	  
	  let currentDate = startDate
	  const addDays = function (days) {
		const date = new Date(this.valueOf())
		date.setDate(date.getDate() + days)
		return date
	  }
	  while (currentDate <= endDate) {
		var nowDate = new Date(currentDate); 
		var yil = nowDate.getFullYear();
		
		if (nowDate.getMonth()+1 < 10) { 
			var ay = '0' + (nowDate.getMonth()+1);
		} else { 
			var ay = nowDate.getMonth()+1;
		}
		
		if (nowDate.getDate() < 10) { 
			var gun = '0' + nowDate.getDate();
		} else { 
			var gun = nowDate.getDate();
		}
		
		var date = gun +'/'+ ay +'/'+ yil;
		dates.push(date);
		izindates.push(date);
		let uniqueChars = [...new Set(izindates)];
		izindates = uniqueChars;
		currentDate = addDays.call(currentDate, 1);
	  }
	  return dates
}

function getfarkDates (startDate, endDate) {
	  const dates = []
	  
	  let currentDate = startDate
	  const addDays = function (days) {
		const date = new Date(this.valueOf())
		date.setDate(date.getDate() + days)
		return date
	  }
	  while (currentDate <= endDate) {
		var nowDate = new Date(currentDate); 
		var yil = nowDate.getFullYear();
		
		if (nowDate.getMonth()+1 < 10) { 
			var ay = '0' + (nowDate.getMonth()+1);
		} else { 
			var ay = nowDate.getMonth()+1;
		}
		
		if (nowDate.getDate() < 10) { 
			var gun = '0' + nowDate.getDate();
		} else { 
			var gun = nowDate.getDate();
		}
		
		var date = gun +'/'+ ay +'/'+ yil;
		dates.push(date);
		
		currentDate = addDays.call(currentDate, 1);
	  }
	  return dates
}


function myNoty(MYlayout,MYtype,MYtext){
	noty({
		layout: MYlayout,
		theme: 'relax', 
		type: MYtype, // success, error, warning, information, notification
		text: MYtext,
		timeout: 3000,
		closeWith: ['hover','click'],
	});
}

$.ajax({
  url: "../dist/katsayilar.json",
  dataType: 'json',
  async: false,
  success: function(data) {
    window.katsayilar = data;
  }
});

$.ajax({
	url: "../adliyeler.json",
	dataType: 'json',
	async: false,
	success: function(data) {
	  window.adliyeler = data;
	}
  });

$.ajax({
  url: "../dist/datalar.json",
  dataType: 'json',
  async: false,
  success: function(data) {
    window.gostergelerArr = data;	
  }
});

function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }


var d = new Date();
var tarih = d.setHours(0,0,0,0) / 1000;
//var url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/adliyecicomtr' + tarih + '/scores/';


/*
function createUserList(item, index, arr) {	
		const li = document.createElement('li');  
		const ul = document.getElementById('ranklistu');		
        li.innerHTML = '<b>' + (index+1) + '- </b>' + item['user'] + ' - ' + item['score'] +' kelime';
		li.setAttribute ('class', 'list-group-item');		
        ul.appendChild(li);
	
}
*/
 
function getGosterge(derecem) { 

	for(var i = 0; i < window.gostergelerArr.length; i++)
	{
	  if(window.gostergelerArr[i].derece == derecem)
	  {			
		return window.gostergelerArr[i];
	  }
	}
}

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function scrollToBottom()
	{
		var height = document.querySelector('.col-lg-12').offsetHeight - 425;
		window.scroll(0 , height);
	}

function scrollToTop()
{
	window.scroll(0 , 0);
}

function paginate(array, page_size, page_number) {
	//return array.slice((page_number - 1) * page_size, page_number * page_size);
	var sliced = array.slice((page_number - 1) * page_size, page_number * page_size);	
	var html = '';
	var sitelink;
	var btn = 'class="btn btn-ghost-info float-end"> Tümünü Oku</a>';
	  
	
	
	
	for (let i = 0; i < sliced.length; i++) {
	var resim = sliced[i]['resim'];
	
	if (sliced[i]['link'] != '-') { 
		sitelink = sliced[i]['link'];
		btn = 'class="btn btn-ghost-success float-end"> Bağlantıya Git</a>';
	} else { 
		sitelink = '/oku?id=' + sliced[i]['id'];
	}
	  html = html + '<div><div class="row"><div class="col-auto"><span class="gokhanavatar" style="background-image: url(' + sliced[i]['resim'] +')"></span></div><div class="col"><div class="text-truncate p-1">' + sliced[i]['baslik'] + '</div><div class="text-muted p-1">' + sliced[i]['aciklama'].substring(0,200) +'</p><a href="' + sitelink +  '" ' + btn + '</div><hr/></div></div>';
	  
	}	
	
	$("#habericerikleri").html(html);
}


function insertScore(date, isim, score) {	
	
	// Sending a receiving data in JSON format using GET method
	//      
	var xhr = new XMLHttpRequest();
	var url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/adliyecicomtr' + date + '/scores/';
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log('veri gitti');
		}
	};
	var data = JSON.stringify({"user": isim, "score": score});
	xhr.send(data);
	//console.log(url);
	

}

$(document).ready(function(){
	
	if($('#tinymce-mytextarea').length>0){
		
		let options = {
          selector: '#tinymce-mytextarea',
          height: 300,
          menubar: false,
          statusbar: false,		
		  default_link_target: '_blank',		  
          plugins: [
            'table advlist autolink lists link code image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'code undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol' +
            'removeformat' + ' code,',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; -webkit-font-smoothing: antialiased; }'
        }
        if (localStorage.getItem("tablerTheme") === 'dark') {
          options.skin = 'oxide-dark';
          options.content_css = 'dark';
        }
        tinyMCE.init(options);
	}
	
	
	if($('#avukatlikucret').length>0){
		
		window.dataT = $('#avukatlikucret').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
			},					
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}

	if($('#hukuksozlugum').length>0){
		
		window.dataT = $('#hukuksozlugum').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
			},					
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});

		$.ajax({
            url: "../dist/sozluk.json",
            dataType: 'json',
            async: false,
            success: function(data) {
				for(var i = 0; i < data.length; i++)
				{
					$('#hukuksozlugum').DataTable().row
                        .add([
                            data[i]['kelime'],
                            data[i]['anlami']
                        ])
                        .draw(false);  

				}
                
            }
        });

		window.dataT.draw();

	}

	if($('#konsolosluklar').length>0){
		
		window.dataT = $('#konsolosluklar').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"bAutoWidth": false, 
			"aoColumns" : [
				{ "sWidth": "15%" },
				{ "sWidth": "15%" },
				{ "sWidth": "15%" },
				{ "sWidth": "15%" },
				{ "sWidth": "40%" }
			],
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
			},					
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}
	
	if($('#kadropersonel').length>0){
		
		window.dataT = $('#kadropersonel').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
			},				
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}
	
		if($('#teskilat').length>0){
		
		window.dataT = $('#teskilat').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "asc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
			},			
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}
	
	if($('#parasalsinirlar').length>0){
		
		window.dataT = $('#parasalsinirlar').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
			},				
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}
	
	if($('#bilirkisiucret').length>0){
		window.dataT = $('#bilirkisiucret').DataTable({
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],			
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
				
			},			
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}
	
	if($('#uzlastirmaciucret').length>0){
		window.dataT = $('#uzlastirmaciucret').DataTable({
			"select": true,
			"fixedHeader": true,
			"order": [[ 0, "desc" ]],
				
			"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Hepsi"]],
			"dom": '<"topleft"PlBf><"dataTables_filter">rt<"bottom"lip><"clear">',
			"pageLength": 50,
			"buttons": [			
			{	
				"text": "Tümü",				
				"className": "btn btn-sm btn-flat bg-blue",
				"action": function () {
					dataT.column(1).search("").draw();
				},
				
			},
			],	
			"language": {
            "url": "../dist/tr.json"
			},
		});
	}	
	
	if($('#table').length>0){
		//getter();
	} 
	
	$('input[name="vekaletmiktar"]').keyup(function() {
		var thiz = $(this);
		var deger = thiz.val();
		var kiranafaka = $('input[name="kiranafaka"]').prop('checked');
		var sonuc = parseFloat($('input[name="vekaletmiktar"]').val()).toFixed(2);
		var cikandeger;
		var hesaplanandeger = 0.00;
		var mahkememaktu = $("#mahkeme-maktu").val();		
			
		// İlk 100.000 için %16			
		if (sonuc > 0 && sonuc <= 100000) { 
			hesaplanandeger = sonuc * 0.16;
		}
		
		// Sonraki 100.000 için %15 - 200
		if (sonuc > 100000 && sonuc <= 200000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + ((sonuc - 100000) * 0.15);
		} 	
		
		// Sonraki 300.000 için %14 - 500		
		if (sonuc > 200000 && sonuc <= 500000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + ((sonuc - 200000) * 0.14);
		} 
		 
		// Sonraki 500.000 için %11 - 1m		
		if (sonuc > 500000 && sonuc <= 1000000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + (300000 * 0.14);
			hesaplanandeger = hesaplanandeger + ((sonuc - 500000) * 0.11);
		} 
		
		// Sonraki 700.000 için %8 - 1.7m		
		if (sonuc > 1000000 && sonuc <= 1700000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + (300000 * 0.14);
			hesaplanandeger = hesaplanandeger + (500000 * 0.11);
			hesaplanandeger = hesaplanandeger + ((sonuc - 1000000) * 0.08);
		} 
		
		// Sonraki 900.000 için %5 - 2.6m
		if (sonuc > 1700000 && sonuc <= 2600000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + (300000 * 0.14);
			hesaplanandeger = hesaplanandeger + (500000 * 0.11);
			hesaplanandeger = hesaplanandeger + (700000 * 0.08);
			hesaplanandeger = hesaplanandeger + ((sonuc - 1700000) * 0.05);
		} 
		
		// Sonraki 1.1m için %3 - 3.7m
		if (sonuc > 2600000 && sonuc <= 3700000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + (300000 * 0.14);
			hesaplanandeger = hesaplanandeger + (500000 * 0.11);
			hesaplanandeger = hesaplanandeger + (700000 * 0.08);
			hesaplanandeger = hesaplanandeger + (900000 * 0.05);
			hesaplanandeger = hesaplanandeger + ((sonuc - 2600000) * 0.03);
		} 
		
		// Sonraki 1.3m için %2 - 5m
		if (sonuc > 3700000 && sonuc <= 5000000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + (300000 * 0.14);
			hesaplanandeger = hesaplanandeger + (500000 * 0.11);
			hesaplanandeger = hesaplanandeger + (700000 * 0.08);
			hesaplanandeger = hesaplanandeger + (900000 * 0.05);
			hesaplanandeger = hesaplanandeger + (1100000 * 0.03);
			hesaplanandeger = hesaplanandeger + ((sonuc - 3700000) * 0.02);
		}

		// Sonraki 5m sonrası için %1 
		if (sonuc > 5000000) { 
			hesaplanandeger = 100000 * 0.16;
			hesaplanandeger = hesaplanandeger + (100000 * 0.15);
			hesaplanandeger = hesaplanandeger + (300000 * 0.14);
			hesaplanandeger = hesaplanandeger + (500000 * 0.11);
			hesaplanandeger = hesaplanandeger + (700000 * 0.08);
			hesaplanandeger = hesaplanandeger + (900000 * 0.05);
			hesaplanandeger = hesaplanandeger + (1100000 * 0.03);
			hesaplanandeger = hesaplanandeger + (3700000 * 0.02);
			hesaplanandeger = hesaplanandeger + ((sonuc - 5000000) * 0.01);
		}
		
		var yazilacakdeger;
		
		if (hesaplanandeger - mahkememaktu > 0) {
			yazilacakdeger = hesaplanandeger;	
		} else {			
			if (sonuc - mahkememaktu > 0) { 
				yazilacakdeger = mahkememaktu;
			} else { 
				yazilacakdeger = sonuc;
			}			
		}
		
		if (mahkememaktu == '17400') { 
			
			if (yazilacakdeger = mahkememaktu) { 
					hesaplanandeger = 100000 * 0.16;
					if (sonuc > 0 && sonuc <= 100000) { 
						hesaplanandeger = sonuc * 0.16;
					}					
					// Sonraki 100.000 için %15 - 200
					if (sonuc > 100000 && sonuc <= 200000) { 
						hesaplanandeger = 100000 * 0.16;
						hesaplanandeger = hesaplanandeger + ((sonuc - 100000) * 0.15);
					} 
					// Sonraki 300.000 için %14 - 500		
					if (sonuc > 200000 && sonuc <= 500000) { 
						hesaplanandeger = 100000 * 0.16;
						hesaplanandeger = hesaplanandeger + (100000 * 0.15);
						hesaplanandeger = hesaplanandeger + ((sonuc - 200000) * 0.14);
					} 						
					// Sonraki 500.000 için %11 - 1m		
					if (sonuc > 500000 && sonuc <= 1000000) { 
						hesaplanandeger = 100000 * 0.16;
						hesaplanandeger = hesaplanandeger + (100000 * 0.15);
						hesaplanandeger = hesaplanandeger + (300000 * 0.14);
						hesaplanandeger = hesaplanandeger + ((sonuc - 500000) * 0.11);
					} 
					yazilacakdeger = hesaplanandeger;				
			}
		
			if (yazilacakdeger - mahkememaktu > 0) { 
				yazilacakdeger = mahkememaktu;
			}
		
			if (yazilacakdeger - 4000 < 0) {  // sulh ceza ücretinden az olamaz
				yazilacakdeger = 4000;
			}
		}
		
		if (kiranafaka == true) { 
			if (yazilacakdeger - mahkememaktu < 0) { 
				yazilacakdeger = mahkememaktu;
			}		
		}
		$("#hesapsonuc").html("<h2>Ücret-i vekalet :<br>" +  parseFloat(yazilacakdeger).toFixed(2) + " TL </h2>");
	})
	
	$('#mahkeme-maktu').change(function() { 
		$('input[name="vekaletmiktar"]').val('0');
		$("#hesapsonuc").html("<h2></h2>");
	});
	

	$('input[name="miktar"]').keyup(function() {
		var thiz = $(this);
		var deger = thiz.val();
		var olumcismani = $('input[name="olumcismani"]').prop('checked');
		var sonuc = parseFloat(hesapla(deger, olumcismani)).toFixed(2);
		
		if (sonuc > 0) { 
			$("#hesapsonuc").html("<h2>Alınması gereken harç :<br>" + parseFloat(hesapla(deger, olumcismani)).toFixed(2) + " TL </h2>");	
		} else { 
			$("#hesapsonuc").html("<h1></h1>");	
		}  
	})
	
	$('input[name="islahmiktar"]').keyup(function() {
		var thiz = $(this);
		var deger = $('input[name="islahmiktar"]').val();
		var davamiktar = $('input[name="davamiktar"]').val();		
		var olumcismani = $('input[name="olumcismanii"]').prop('checked');
		var netice = deger - davamiktar;
		
		if (deger - davamiktar > 0) { 
			var sonuc = parseFloat(hesapla(netice, olumcismani)).toFixed(2);			
		} else { 
			myNoty('topRight','danger','Dava miktarı ıslah miktarından büyük yada eşit olamaz');
		
		}		
		
		if (sonuc > 0) { 
			$("#hesapsonuc").html("<h2>Alınması gereken harç :<br>" + parseFloat(hesapla(netice, olumcismani)).toFixed(2) + " TL </h2>");	
		} else { 
			$("#hesapsonuc").html("<h1></h1>");	
		}		  
	})
	
	$('input[name="davamiktar"]').keyup(function() {
		var thiz = $(this);
		var deger = $('input[name="islahmiktar"]').val();
		var davamiktar = $('input[name="davamiktar"]').val();		
		var olumcismani = $('input[name="olumcismanii"]').prop('checked');
		var netice = deger - davamiktar;
		
		if (deger - davamiktar > 0) { 
			var sonuc = parseFloat(hesapla(netice, olumcismani)).toFixed(2);		
		} else { 
			myNoty('topRight','danger','Dava miktarı ıslah miktarından büyük yada eşit olamaz');
		
		}		
		
		if (sonuc > 0) { 
			$("#hesapsonuc").html("<h2>Alınması gereken harç :<br>" + parseFloat(hesapla(netice, olumcismani)).toFixed(2) + " TL </h2>");	
		} else { 
			$("#hesapsonuc").html("<h1></h1>");	
		}		  
	})

	$('input[name="olumcismani"]').change(function() {
		
		var deger = $('input[name="miktar"]').val();
		var olumcismani = $('input[name="olumcismani"]').prop('checked');
		var sonuc = parseFloat(hesapla(deger, olumcismani)).toFixed(2);
		
		if (sonuc > 0) { 
			$("#hesapsonuc").html("<h2>Alınması gereken harç :<br>" + parseFloat(hesapla(deger, olumcismani)).toFixed(2) + " TL </h2>");	
		} else { 
			$("#hesapsonuc").html("<h1></h1>");	
		} 
		
	})
	
	$('#maaslarsablon').change(function() {
		var unvan = $('#maaslarsablon').val();

		function endusukmemur() {
			$('#tabikanun').val(1); // yeni kanun
			$('#mezuniyet').val(2); // lise mezunu
			$('#kadroderece').val('13/3'); // 13/3
			document.getElementById('hizmetyili').value='1';  // 1 yıllık
			$('#medenidurum').val('0'); // bekar
			$('#cocuk72aydankucuk').val('0'); // 72 aydan küçük 0
			$('#cocuk72aydanbuyuk').val('0'); // 72 aydan küçük 0
			$('#engellicocuk72aydankucuk').val('0'); // 72 aydan küçük 0
			$('#engellicocuk72aydanbuyuk').val('0'); // 72 aydan küçük 0
			$('#sendikauye').val('0'); // 72 aydan küçük 0
			$('#tasiniryetkili').val('0'); // 72 aydan küçük 0
			$('#beskesintisi').val('1'); // 72 aydan küçük 0
			$('#sendikaikramiye').val('0'); // 72 aydan küçük 0
			$('#gorevyeri').val('5'); // 72 aydan küçük 0
			$('#yabancidil').val('0'); // 72 aydan küçük 0	
		}

		function endusukmudur() {
			$('#tabikanun').val(1); // yeni kanun
			$('#mezuniyet').val(2); // lise mezunu
			$('#kadroderece').val('6/1'); // 6/1
			document.getElementById('hizmetyili').value='6';  // 6 yıllık
			$('#medenidurum').val('0'); // bekar
			$('#cocuk72aydankucuk').val('0'); // 72 aydan küçük 0
			$('#cocuk72aydanbuyuk').val('0'); // 72 aydan küçük 0
			$('#engellicocuk72aydankucuk').val('0'); // 72 aydan küçük 0
			$('#engellicocuk72aydanbuyuk').val('0'); // 72 aydan küçük 0
			$('#sendikauye').val('0'); // 72 aydan küçük 0
			$('#tasiniryetkili').val('0'); // 72 aydan küçük 0
			$('#beskesintisi').val('1'); // 72 aydan küçük 0
			$('#sendikaikramiye').val('0'); // 72 aydan küçük 0
			$('#gorevyeri').val('5'); // 72 aydan küçük 0
			$('#yabancidil').val('0'); // 72 aydan küçük 0	
		}

		function enyuksekmemur() {
			$('#tabikanun').val(2); // yeni kanun
			$('#mezuniyet').val(1); // lise mezunu
			$('#kadroderece').val('1/4'); // 13/3
			document.getElementById('hizmetyili').value='30';  // 1 yıllık
			$('#medenidurum').val('2273'); // evli eşi çalışmıyor
			$('#cocuk72aydankucuk').val('0'); // 72 aydan küçük 0
			$('#cocuk72aydanbuyuk').val('0'); // 72 aydan küçük 0
			$('#engellicocuk72aydankucuk').val('3'); // 72 aydan küçük 0
			$('#engellicocuk72aydanbuyuk').val('0'); // 72 aydan küçük 0
			$('#sendikauye').val('2119'); // sendika üyesi
			$('#tasiniryetkili').val('575'); // taşınır kayıt yetkilisi
			$('#beskesintisi').val('0'); // bes yok
			$('#sendikaikramiye').val('1'); // ikramiye alacak
			$('#gorevyeri').val('15'); // istanbul
			$('#yabancidil').val('750'); // A seviye yabancı dil	
		}

		if (unvan == "1") { // en düşük katip maaşı eski
			$('#unvan').val(2);
			endusukmemur();
			maashesapla();	
		} else if (unvan == "1y") { // en düşük katip maaşı yeni
			$('#unvan').val(2);
			endusukmemur();	
			yenimaashesapla();	

		} else if (unvan == "2") { // en düşük icra katibi eski
			$('#unvan').val(6);
			endusukmemur();
			maashesapla();	
		} else if (unvan == "2y") { // en düşük icra katibi yeni
			$('#unvan').val(6);
			endusukmemur();	
			yenimaashesapla();		
		} else if (unvan == "3") { // en düşük Cezaevi katibi eski
			$('#unvan').val(7);
			endusukmemur();
			maashesapla();	
		} else if (unvan == "3y") { // en düşük Cezaevi katibi yeni
			$('#unvan').val(7);
			endusukmemur();	
			yenimaashesapla();		
		} else if (unvan == "4") { // en düşük Mübaşir katibi eski
			$('#unvan').val(3);
			endusukmemur();
			maashesapla();	
		} else if (unvan == "4y") { // en düşük Mübaşir katibi yeni
			$('#unvan').val(3);
			endusukmemur();	
			yenimaashesapla();		
		} else if (unvan == "5") { // en düşük YİM  eski
			$('#unvan').val(1);
			endusukmudur();
			maashesapla();	
		} else if (unvan == "5y") { // en düşük YİM  yeni
			$('#unvan').val(1);
			endusukmudur();	
			yenimaashesapla();		
		} else if (unvan == "6") { // en düşük İcM  eski
			$('#unvan').val(4);
			endusukmudur();
			maashesapla();	
		} else if (unvan == "6y") { // en düşük İcM  yeni
			$('#unvan').val(4);
			endusukmudur();	
			yenimaashesapla();		
		} else if (unvan == "7") { // en düşük İcM Y  eski
			$('#unvan').val(5);
			endusukmudur();
			maashesapla();	
		} else if (unvan == "7y") { // en düşük İcM Y  yeni
			$('#unvan').val(5);
			endusukmudur();	
			yenimaashesapla();		
		} else if (unvan == "8") { // en düşük İKM  eski
			$('#unvan').val(13);
			endusukmemur();
			maashesapla();	
		} else if (unvan == "8y") { // en düşük İKM  yeni
			$('#unvan').val(13);
			endusukmemur();	
			yenimaashesapla();		
		} else if (unvan == "9") { // en düşük Güvenlik  eski
			$('#unvan').val(8);
			endusukmemur();
			maashesapla();	
		} else if (unvan == "9y") { // en düşük Güvenlik  yeni
			$('#unvan').val(8);
			endusukmemur();	
			yenimaashesapla();		
		} else if (unvan == "11") { // en düşük Cezaevi Müdürü  eski
			$('#unvan').val(8);
			endusukmudur();
			maashesapla();	
		} else if (unvan == "11y") { // en düşük Cezaevi Müdürü  yeni
			$('#unvan').val(8);
			endusukmudur();	
			yenimaashesapla();		
		} else if (unvan == "12") { // en düşük İdari İşler Müdürü  eski
			$('#unvan').val(12);
			endusukmudur();
			maashesapla();	
		} else if (unvan == "12y") { // en düşük İdari İşler Müdürü  yeni
			$('#unvan').val(12);
			endusukmudur();	
			yenimaashesapla();		
		} else if (unvan == "101") { // en yüksek katip maaşı eski
			$('#unvan').val(2);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "101y") { // en yüksek katip maaşı yeni
			$('#unvan').val(2);
			enyuksekmemur();	
			yenimaashesapla();
		} else if (unvan == "102") { // en yüksek icra katibi eski
			$('#unvan').val(6);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "102y") { // en yüksek icra katibi yeni
			$('#unvan').val(6);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "103") { // en yüksek Cezaevi katibi eski
			$('#unvan').val(7);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "103y") { // en yüksek Cezaevi katibi yeni
			$('#unvan').val(7);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "104") { // en yüksek Mübaşir katibi eski
			$('#unvan').val(3);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "104y") { // en yüksek Mübaşir katibi yeni
			$('#unvan').val(3);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "105") { // en yüksek YİM  eski
			$('#unvan').val(1);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "105y") { // en yüksek YİM  yeni
			$('#unvan').val(1);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "106") { // en yüksek İcM  eski
			$('#unvan').val(4);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "106y") { // en yüksek İcM  yeni
			$('#unvan').val(4);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "107") { // en yüksek İcM Y  eski
			$('#unvan').val(5);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "107y") { // en yüksek İcM Y  yeni
			$('#unvan').val(5);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "108") { // en yüksek İKM  eski
			$('#unvan').val(13);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "108y") { // en yüksek İKM  yeni
			$('#unvan').val(13);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "109") { // en yüksek Güvenlik  eski
			$('#unvan').val(8);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "109y") { // en yüksek Güvenlik  yeni
			$('#unvan').val(8);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "111") { // en yüksek Cezaevi Müdürü  eski
			$('#unvan').val(10);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "111y") { // en yüksek Cezaevi Müdürü  yeni
			$('#unvan').val(10);
			enyuksekmemur();	
			yenimaashesapla();		
		} else if (unvan == "112") { // en yüksek İdari İşler Müdürü  eski
			$('#unvan').val(12);
			enyuksekmemur();
			maashesapla();	
		} else if (unvan == "112y") { // en yüksek İdari İşler Müdürü  yeni
			$('#unvan').val(12);
			enyuksekmemur();	
			yenimaashesapla();		
		} 

	  });	

	  /*
                                <option value="12y">En düşük İdari İşler Müdürü maaşı</option>                                              
                                <option value="112y">En yüksek İdari İşler Müdürü maaşı</option>   
		*/						
	

	
	$( "#maashesapla" ).click(function() {
		
		maashesapla();		
		
	})

	$( "#giderhesapla" ).click(function() {
		var el;
		var tebligatprefix = 'gteb';
		var tebligatgiderprefix = 'gteb';
		
		var etebligatprefix = 'gteb';
		var tebligatsayisi = 0;

		for(var i = 1; el = document.getElementById(prefix + i); i++) {
			tebligatsayisi = (tebligatsayisi * 1) + (document.getElementById(prefix + i).value * 1)
		}		
				
		
	})

	

	$( "#yenimaashesapla" ).click(function() {
		
		yenimaashesapla();		
		
	})
	
	$("#maashesapla").mouseup(function() {
		scrollToBottom();
	});

	
	$( "#sozmaashesapla" ).click(function() {
		
		var aylik_gosterge = window.katsayilar[1].aylik_katsayi;		
		var taban_ayligi_katsayisi = window.katsayilar[1].taban_ayligi_katsayi;
		var yan_odeme_katsayisi = window.katsayilar[1].yan_odeme_katsayi;
		var gelir_vergisi_istisna = window.katsayilar[1].gelir_vergisi_istisna;
		var damga_vergisi_istisna = window.katsayilar[1].damga_vergisi_istisna;
		var son_artis = window.katsayilar[1].enflasyon;
		var fark_artis = window.katsayilar[2].enflasyon;
		var toplu_soz_artis = window.katsayilar[3].enflasyon;
		// formdaki veriler 
		var unvan = $('#unvan').val();
		var sozlesme_ucret = $('input[name="sozlesmeucreti"]').val();;				
		var hizmet_yili = $('#hizmetyili').val();
		var medeni_durum = $('#medenidurum').val();
		var cocuk72aydankucuk = $('#cocuk72aydankucuk').val();
		var cocuk72aydanbuyuk = $('#cocuk72aydanbuyuk').val();
		var engellicocuk72aydankucuk = $('#engellicocuk72aydankucuk').val();
		var engellicocuk72aydanbuyuk = $('#engellicocuk72aydanbuyuk').val();
		var sendikauye = $('#sendikauye').val();
		var sendikaikramiye = $('#sendikaikramiye').val();
		var seyyanen_zam =  parseFloat(15965 * aylik_gosterge).toFixed(2);
		
		// ## GELİRLER ## //
		// aile yardımı eş
		var es_yardimi_tutar = parseFloat(medeni_durum * aylik_gosterge).toFixed(2);
		// çocuk yardımı
		var cocuk_yardim_tutar = parseFloat(((cocuk72aydankucuk * 500) + (cocuk72aydanbuyuk * 250) + (engellicocuk72aydankucuk * 750) + (engellicocuk72aydanbuyuk * 375)) * aylik_gosterge).toFixed(2);
		var ek_odeme = parseFloat(9500 * hizmet_yili * aylik_gosterge / 100).toFixed(2);
		// sendika ödemesi
		var sendika_ikramiye_tutar = parseFloat(aylik_gosterge * sendikaikramiye * sendikauye).toFixed(2);
				
		// ## GİDERLER ## //
		// gss primi 
		var gss_primi = parseFloat(5 * sozlesme_ucret / 100).toFixed(2);
		var em_kes_kisi = parseFloat(9 * sozlesme_ucret / 100).toFixed(2);
		var damga_vergisi = parseFloat(damga_vergisi_istisna - (((sozlesme_ucret * 1) + (ek_odeme * 1)) * 0.00759)).toFixed(2);
		
		if (damga_vergisi * 1 > 0) { 
			damga_vergisi = 0.00;
		} else { 
			damga_vergisi = damga_vergisi * -1;
		}
		var sendika_kesinti_tutar = parseFloat(((sozlesme_ucret * 1) + (ek_odeme * 1)) * 0.5 / 100).toFixed(2);
		
		var gelir_vergisi = parseFloat((gelir_vergisi_istisna * 1) - (((sozlesme_ucret *1) - (em_kes_kisi * 1) - (gss_primi *1) - (seyyanen_zam *1) - (sendika_kesinti_tutar *1)) * 15 / 100));
		if (gelir_vergisi * 1 > 0) { 
			gelir_vergisi = 0.00;
		} else { 
			gelir_vergisi = gelir_vergisi * -1;
		}
				
		var artilartoplam = parseFloat((sozlesme_ucret * 1) + (sendika_ikramiye_tutar * 1) + (es_yardimi_tutar * 1) + (cocuk_yardim_tutar * 1) + (ek_odeme * 1) + (seyynane_zam * 1)  + (cocuk_yardim_tutar * 1)).toFixed(2);		
		var eksilertoplam = parseFloat((gelir_vergisi * 1) + (damga_vergisi * 1) + (damga_vergisi * 1) + (em_kes_kisi * 1) + (gss_primi * 1) + (sendika_kesinti_tutar * 1)).toFixed(2);

		net_maas = (artilartoplam * 1) - (eksilertoplam *1);
		var fark_maas = net_maas * (100 + (fark_artis *1)) / 100;
		var toplu_soz_maas = fark_maas * (100 + (toplu_soz_artis * 1)) / 100;
		
		
			
		$("#hesapsonuchtml").html('<div class="mb-3"><div class="row"><div class="mb-3 text-green">Gelirler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>İstihaklar</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Sözleşme Ücreti</td><td></td><td>' + sozlesme_ucret +'</td></tr><tr><td>Ek Ödeme</td><td>' + hizmet_yili +'</td><td>' + ek_odeme +'</td></tr><tr><td>Aile Yardımı (Eş)</td><td>2273</td><td>' + es_yardimi_tutar +'</td></tr><tr><td>Çocuk Yardımı</td><td></td><td>' + cocuk_yardim_tutar +'</td></tr><tr><td>Toplu Sözleşme İkramiyesi</td><td>2119</td><td>' + sendika_ikramiye_tutar +'</td></tr><tr><td>375 SK EK Madde 40</td><td>' + 15965 + '</td><td>' + seyyanen_zam + '</td></tr></tbody></table></div></div><div class="mb-3 text-red">Kesintiler</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Kesintiler</th><th>Oran</th><th>Tutar</th></tr></thead><tbody><tr><td>Gelir Vergisi</td><td>%15</td><td>' + gelir_vergisi.toFixed(2) + '</td></tr><tr><td>Damga Vergisi</td><td>7,59</td><td>' + damga_vergisi + '</td></tr><tr><td>Em.Kes.Karşılığı - Devlet</td><td>%9</td><td>' + em_kes_kisi + '</td></tr><tr><td>SGK Primi - Kişi</td><td>%5</td><td>' + gss_primi + '</td></tr><tr><td>Sendika Kesintisi</td><td>%0.50</td><td>' + sendika_kesinti_tutar + '</td></tr></tbody></table></div><div class="mb-3 text-blue">Toplam</div><div class="table"><table class="table table-vcenter card-table"><thead><tr><th>Toplam</th><th>Tutar</th><th></th></tr></thead><tbody><tr><td>İstihaklar Toplamı</td><td></td><td>' + artilartoplam + ' ₺</td></tr><tr><td>Kesintiler Toplamı</td><td></td><td>-' + eksilertoplam + ' ₺</td></tr><tr><th class="text-green">Net Maaş</th><td></td><td>' + net_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-indigo">%' + fark_artis + ' Enflasyon farkı Ekli Net Maaş</td><td></td><td>' + fark_maas.toFixed(2) + ' ₺</td></tr><tr><td class="text-pink">%' + fark_artis + ' Enflasyon farkı ve %' + toplu_soz_artis + ' toplu sözleşme ekli net maaş</td><td></td><td>' + toplu_soz_maas.toFixed(2) + ' ₺</td></tr></tbody></table></div></div>');
	})

	
	$( "#emeklimaashesapla" ).click(function() {
		var aylik_gosterge = window.katsayilar[1]['aylik_katsayi'];		
		var taban_ayligi_katsayisi = window.katsayilar[1]['taban_ayligi_katsayi'];
		var son_artis = window.katsayilar[1]['enflasyon'];
		var fark_artis = window.katsayilar[2]['enflasyon'];
		var toplu_soz_artis = window.katsayilar[3]['enflasyon'];		
		var emek_esas_unvan = $('#unvan').val();
		var kadro_derece = $('#kadroderece').val();
		var emek_esas_derece = $('#emekliderece').val();
		var mezuniyet = $('#mezuniyet').val();
		var hizmet_yili = $('input[name="hizmetyili"]').val();
		var kidem_yili = $('input[name="kidemyili"]').val();
		var ikramiye_yili = $('input[name="ikramiyeyili"]').val();		
		var ilgili_derece_bilgileri = getGosterge(kadro_derece);
		var gosterge_ayligi = ilgili_derece_bilgileri['gosterge'];
		var ek_gosterge_ayligi;
		var ozel_hizmet_oran;
		var ozel_hizmet_tutar;
		var gosterge_ayligi_tutar;
		var ek_gosterge_ayligi_tutar;
		var taban_ayligi_tutar;
		var kidem_ayligi_tutar;
		var ek_odeme_tutar;
		var brut_ikramiye;
		var brut_maas;
		var net_ikramiye;
		var net_maas;
		var maas_baglama_orani;
		
		if (kidem_yili > 25) { 
			kidem_yili = 25;
		}
		
		if (emek_esas_unvan == 1) {  // Müdür
			ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_mudur'];
		} else {  
			if (mezuniyet == 1) { 
				ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_uni'];
			} else { 
				ek_gosterge_ayligi = ilgili_derece_bilgileri['ek_gosterge_digerleri'];
			}
		}		
		// ek ödeme diğerleri toplamı %4		
		// özel hizmet aylığı oran bulma, bulunan oran 9500 ve aylık katsayı ile çarpılacak 
		if (ek_gosterge_ayligi >= 3600) { 
			ozel_hizmet_oran = 145;
		} else if (ek_gosterge_ayligi >= 2200) { 
			ozel_hizmet_oran = 85;
		} else { 
			ozel_hizmet_oran = 55;
		}
		
		ozel_hizmet_tutar = parseFloat(9500 * aylik_gosterge * ozel_hizmet_oran / 100).toFixed(2);		
		gosterge_ayligi_tutar = parseFloat(gosterge_ayligi * aylik_gosterge).toFixed(2);
		ek_gosterge_ayligi_tutar = parseFloat(ek_gosterge_ayligi * aylik_gosterge).toFixed(2);
		taban_ayligi_tutar = parseFloat(1000 * taban_ayligi_katsayisi).toFixed(2);
		kidem_ayligi_tutar = parseFloat(20 * kidem_yili * aylik_gosterge).toFixed(2);
		ek_odeme_tutar = parseFloat(((ozel_hizmet_tutar * 1) + (gosterge_ayligi_tutar * 1 ) + (ek_gosterge_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1)) * 4 / 100).toFixed(2);
		brut_maas = parseFloat((ozel_hizmet_tutar * 1) + (gosterge_ayligi_tutar * 1) + (ek_gosterge_ayligi_tutar * 1) + (taban_ayligi_tutar * 1) + (kidem_ayligi_tutar * 1) + (ek_odeme_tutar * 1)).toFixed(2);
		brut_ikramiye = parseFloat(ikramiye_yili * brut_maas).toFixed(2);
		net_maas = brut_maas * (50 + (hizmet_yili * 1)) / 100;
		net_ikramiye = (brut_ikramiye *1) - (ek_odeme_tutar * ikramiye_yili);
		maas_baglama_orani = (50 + (hizmet_yili * 1)) / 100;
		
		
				
		$("#hesapsonuchtml").html('<div class="table"><table class="table table-vcenter card-table"> <thead><tr> <th>Ödeme</th> <th>Brüt</th> <th>Net</th></tr></thead> <tbody><tr> <td>Ek Ödeme</td><td class="text-muted">' + ek_odeme_tutar + '</td><td class="text-muted">' + (ek_odeme_tutar * maas_baglama_orani).toFixed(2) + '</td></tr><tr> <td>Özel Hizmet Aylığı</td><td class="text-muted"> ' + ozel_hizmet_tutar + '</td><td class="text-muted"> ' + (ozel_hizmet_tutar * maas_baglama_orani).toFixed(2) + '</td></tr><tr> <td>Gösterge Aylığı</td><td class="text-muted">' + gosterge_ayligi_tutar +'</td><td class="text-muted">' + (gosterge_ayligi_tutar * maas_baglama_orani).toFixed(2) + '</td></tr><tr> <td>Ek Gösterge Aylığı</td><td class="text-muted">' + ek_gosterge_ayligi_tutar +'</td><td class="text-muted">' + (ek_gosterge_ayligi_tutar * maas_baglama_orani).toFixed(2) + '</td></tr><tr> <td>Taban Aylığı</td><td class="text-muted">' + taban_ayligi_tutar +'</td><td class="text-muted">' + (taban_ayligi_tutar * maas_baglama_orani).toFixed(2) + '</td></tr><tr> <td>Kıdem Aylığı</td><td class="text-muted">' + kidem_ayligi_tutar +'</td><td class="text-muted">' + (kidem_ayligi_tutar * maas_baglama_orani).toFixed(2) + '</td></tr><tr> <td><b>Aylık Maaş</b></td><td class="text-muted">' + brut_maas +' </td><td class="text-muted text-green"><b>' + net_maas.toFixed(2) +'</b> TL</td></tr><tr><td><b>İkramiye</b></td><td class="text-muted">' + brut_ikramiye +'</td><td class="text-muted text-red"><b>' + net_ikramiye.toFixed(2) +'</b> TL</td></tr></tbody></table> </div>');
		
		
	})
	
	
	

	$( "#suryolhesapla" ).click(function() {
		var derece = $('#kadroderece').val();
		var unvan = $('#unvan').val();
		var fertsayisi = $('#fertsayisi').val();
		var mesafemiktar = $('input[name="mesafemiktar"]').val();
		var biletmiktar = $('input[name="biletmiktar"]').val();
		var ekbilgi = '(Alınacak Ücret üzerinden binde 7.59 oranında damga vergisi kesintisi yapılabilir.)';
		var carpan = 0;
		var hesap = 0;
		var kesintili;
		
		if (unvan == 1) { 
			carpan = 212;
		} else { 
			carpan = parseInt(derece);
		}
		
		hesap = (carpan * 20);
		hesap = hesap + ((fertsayisi +1) * biletmiktar); 
		hesap = hesap + ((mesafemiktar * carpan) / 20);	
		hesap = hesap + carpan;
		
		kesintili = hesap - (hesap * 7.59 / 1000);
		
		if (hesap > 0) { 
			$("#hesapsonuc").html("<h2>Alınacak Ücret :<br>" + parseFloat(hesap) + " TL </h2><br>" + ekbilgi + '<br>Kesintili miktar:' + parseFloat(kesintili).toFixed(2) );	
		} else { 
			$("#hesapsonuc").html("<h1></h1>");	
		}			
	})
	

	$('input[name="posta"]').change(function() {
		var thiz = $(this);
	})
	
	
	$('input[name="olumcismanii"]').change(function() {
		
		var thiz = $(this);
		var deger = $('input[name="islahmiktar"]').val();
		var davamiktar = $('input[name="davamiktar"]').val();		
		var olumcismani = $('input[name="olumcismanii"]').prop('checked');
		var netice = deger - davamiktar;
		
		if (deger - davamiktar > 0) { 
			var sonuc = parseFloat(hesapla(netice, olumcismani)).toFixed(2);		
		} else { 
			myNoty('topRight','danger','Dava miktarı ıslah miktarından büyük yada eşit olamaz');
		
		}		
		
		if (sonuc > 0) { 
			$("#hesapsonuc").html("<h2>Alınması gereken harç :<br>" + parseFloat(hesapla(netice, olumcismani)).toFixed(2) + " TL </h2>");	
		} else { 
			$("#hesapsonuc").html("<h1></h1>");	
		}		  
	})	

	$( "#gunekle" ).click(function() {		
		const dates = getDates(gunlericevir($('input[name="izin-baslama"]').val()), gunlericevir($('input[name="izin-bitis"]').val()));
		tinyMCE.activeEditor.setContent(izindates.join('<br>'));					  
	})	
	
	$( "#modal-team #gonder" ).click(function() {		
		var isim = $('#modal-team #isim').val(); //toDo
		var sc = $('#modal-team #score').text();
		var d = new Date();
		var tarih = d.setHours(0,0,0,0) / 1000;
		setCookie('isim', isim, 90);
		insertScore(tarih, isim, sc);
	})	
	
	$( "#gunhesapla" ).click(function() {
		
		const dates = getfarkDates(gunlericevir($('input[name="tarih-baslama"]').val()), gunlericevir($('input[name="tarih-bitis"]').val()));
		farkdates = dates;
		$("#hesapsonuc").html(
		"<h3>İki tarih arasındaki fark : " + 	farkdates.length + "</h3>" 
		+ "<br>" + 
		"<h3  class='text-success'>İzinler düşüldükten sonraki fark : " + 	gunleridus() + "</h3>" 
		);
	})
	
	$( "#haberolustur" ).click(function() {
		var id = $('input[name="haberid"]').val();
		var haberbaslik = $('input[name="haberbaslik"]').val();
		var haberaciklama = $('input[name="haberaciklama"]').val();
		var haberaciklama = $('input[name="haberaciklama"]').val();
		var metin = tinymce.get("tinymce-mytextarea").getContent();
		
		$("#haberjson").text('{ "id": "' + id + '","baslik": "' + haberbaslik + '","aciklama": "' + haberaciklama + '","metin": "' + metin.replaceAll('"', "'") + '","resim": ".\/dist\/img\/logos\/adalet.jpg"},');
		navigator.clipboard.writeText($("#haberjson").text());
	})
	
	$( "#guncelle" ).click(function() {
		var editoricerigi = tinyMCE.activeEditor.getContent();
		editoricerigi = editoricerigi.replaceAll('<p>', '');
		editoricerigi = editoricerigi.replaceAll('</p>', '');
		editoricerigi = editoricerigi.replaceAll('\n', ',');
		editoricerigi = editoricerigi.replaceAll('&nbsp;', ',');						
		izindates = editoricerigi.split(",");								
		myNoty('topRight','success','Liste güncellendi.');
	})	
	
	
	$('#carousel-captions').carousel({
	  interval: 2000
	})	
	

	
	if($('#sendikaikramiye').length>0) {
		
		const  d = new Date(); 
		//int month = d.getDate();
		
		
		
		if (d.getMonth() == 0 || d.getMonth() == 3 || d.getMonth() == 6 || d.getMonth() == 9 ) { 
			$('#sendikaikramiye').val('1');
		} else { 
			$('#sendikaikramiye').val('0');
		}
		
		console.log('tarih : ' + d.getMonth());
		
	}
	
	if($('#hesaplanannetmaas').length>0){
		scrollToBottom();
	} 

	if($('#adliyeicerigi').length>0){
		var postsCount = window.adliyeler.length;
		var posts = data;

		var randomIndexUsed = [];
		var counter = 0;
		var numberOfPosts = 1;

		var divRandomPosts = $('#adliyeicerigi');
		$("#adliyeicerigi").html('<div class="card-header text-center">{{ post.name }}</div>  <div class="card-body center">');

		while (counter < numberOfPosts)
		{
			var randomIndex = Math.floor(Math.random() * postsCount);

			if (randomIndexUsed.indexOf(randomIndex) == "-1")
			{
				var name = posts[randomIndex].name;
				var telefon = posts[randomIndex].telefon;
				var fotograf = posts[randomIndex].fotograf;

				if (counter == (numberOfPosts - 1))
				{
					divRandomPosts.append('<img class="card-img-top" src="http://adliyeci.com.tr/"' + fotograf + '" alt="'+ name + '">   <br /> <br /><label class="text-center">İletişim : {{ post.telefon }}</label>');
				}
				else
				{
					divRandomPosts.append(' <br /> </div>');
				}

				randomIndexUsed.push(randomIndex);

				counter++;
			}
		}
	}

	
	if($('#pagination-demo').length>0){
		$('#pagination-demo').twbsPagination({
        totalPages: Math.ceil(window.haberlerArr.length / 5),
        visiblePages: goruntulenecekSayfa,
		first: "ilk",
		prev: "önceki",
		next: "sonraki",
		last: "son",
		loop: true,
        onPageClick: function (event, page) {
            //$('#page-content').text('Page ' + page);
			console.log(paginate(window.haberlerArr, 5, page));
        }
    });
	} 

	$('.list-group-item').on('click', function() {
		var $this = $(this);
		var $alias = $this.data('alias');
		listGroupcClick($this, $alias)
		

		var isDisabled = $this.prop('disabled');

		if (!isDisabled) {
			$('.glyphicon', this)
				.toggleClass('glyphicon-chevron-right')
				.toggleClass('glyphicon-chevron-down');		

				$('.list-group-item').removeClass('active');
				$this.toggleClass('active')
			}
	});

	$( "#eklenti" ).click(function() {		
		$('#treeview').show();
	});

	$( "#nextwq, #nextcq" ).click(function() {		
		$('#quiz').carousel('next');
		$('#dogrucevap').hide();
        $('#yanliscevap').hide();
		$(".text-justify.w-100.border-bottom").removeClass('disabled');
	});


});