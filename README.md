Compound Component Pattern : 
Model ın , dropdown , tabi , accordion ,Toggle ın veya tabın açılıp kapanması için her şeyin 1 ana bileşen içerisinde yazılmasıdır . 
Örnek: 
<Toggle>
  <Toggle.Button />
  <Toggle.On />
  <Toggle.Off />
</Toggle>

Normale göre okunurluğu artıyor . 
Ve hepsi ortak hafızadan çalışır . Provider ile ana bileşendeki on ,off , value değerleri childrenlara aktarılır . 

CVA = Class Variance Authority
Aynı komponent içinde farklı varyasyonlar oluşturmaya yarıyor . Otomatik type güvenliği sağlanıyor .

Asıl amaç projenin içinde kendimize bir kütüphane oluşturuyoruz. Böylece her seferinde buton , input vs gibi eventlara tek tek style vermek durumunda kalmıyoruz