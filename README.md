GÜN-5

Multi step formslarda kullanıcı geri yaptığında verilerin kaybolmaması çok önemlidir. 
Mantığı veriyi tek yerde tut, sadece değişeni güncelle, step bazlı doğrula, gereksiz re-render yapma ve gerekirse global store kullanırız.veriler bu projede zustandde saklanıyor


Nested loop (iç içe objeler) varsa: ya JSON.stringify ile hücreye yazarız ya da “flatten” ederiz.
Utf 8 + Türkçe Excell için bazen \uFEFF (BOM) eklememiz gerekebilir. 
Büyük veri (10k+ satır) için: işlem süresini azaltmak adına kolonları sabitlemek ve mümkünse Web Worker kullanmak iyi olur.
Template i de genel olarak hazır template zaten.


Sayfayı yenileyince düz from sayfasına gitmemek için ?step= sayı ekliyoruz ki hangi sayfada refresh atılırsa o sayfadan devam ederiz . 

/form?step=1
/form?step=2
/form?step=3
