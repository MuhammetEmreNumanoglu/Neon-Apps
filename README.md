TanStack Query (React Query: Frontendin sahibi olmadığı sunucudan gelen veriyi yönetir .

Server state : 
Sunucuda yaşayan 
Asenkron yapılardır (async-await)
Bilgiler güncel olmayabilir 
Bu verinin ne zaman değiştiğini frontend bilemez. Kontrol sunucudadır.

Örnek:
API response’ları (/users, /orders)
Giriş yapmış kullanıcı bilgisi
Dashboard istatistikleri
Sayfalı / filtreli liste verileri


Client State (İstemci Durumu):
Sadece tarayıcıda yaşayan
Tamamen senin kontrolünde olan
Kullanıcı etkileşimiyle değişen veriler

Örnek:
Modal açık / kapalı
Form input değerleri
Dark / light tema
Stepper adımı


Problem ise şudur :
Serverda error , cache gibi şeyler olur böyleyece her seferinde data güncel mi değil mi diye fazla sorgu olunca sistem yorulur . 

Tanstack ise  UI state tutmaz.
Sadece sunucudan gelen verinin yaşam döngüsünü yönetir.

Tanstack şunları otomatik yapar : 
Fetching
Catching 
Stale
Background Sync
Deduplication
Mutation 

Redux / Zustand Neden Server State İçin Uygun Değil:
Sadece state saklar
Verinin bayat olduğunu bilmez
Otomatik refetch yapmaz
Cache invalidation mantığı yoktur
Async lifecycle’ı anlamaz




Stale Time : Verilerin ne zaman güncel olmadığını belirleyeceği zamanı belirler.
Cache Time : Kullanılmayan verilerin ne zaman silineceği zamanı belirler.


Spinner olunca sayfanın ne zaman yükleneceği , internet mi gitti bilinmez . Ama iskelet ekranı çıkınca sayfanın nasıl olacağını bir nevi siyah beyaz şekilde gösterir . Ve daha az beklendi hissiyatı verir