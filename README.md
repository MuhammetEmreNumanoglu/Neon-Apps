Redux = prop drillingin engellenip bir yerdeki bilgiye her yerden erişebilmek için , app componentini store a bağlarız ve store a her yerden erişim sağlanır. 

Zustand= State i normal bir javascript objesi gibi yazıp react hook olarak kullanıyoruz . temel mantığı bilgiyi direkt olarak çekebiliyor . Provider ,distpatch ve reducer kullanmaya gerek kalmıyor . daha kolay . Ama bilinmesi gereken şey her bilgiyi diyeyim farklı bir fonksiyon içinde yazmamız lazım .eğer ki tek fonksiyonda yazarsak , 1 i bile değişse hepsi render ediliyor gereksiz yük biniyor . 

Reduxın öğrenmesi zaman alır .Ama debugta kolaylık sağlar
zustand öğrenmesi kolay olsa da disiplin geliştiriciye kalıyor.

RBAC Frontend de bir kişinin o sayfaya erişimi var mı diye kontrol edilir . ProtectedRoute + auth guard ile güvenlik daha da fazla olur. 
Admin olmayan kullanıcı admin panelini göremez.

Storedaki state i localStorage a otomatik kaydeder ve sayfa yenilenince localStorage'tan geri yükler . Mesela dark mode light modda local storagetaki bilgiler gerekiyor ki light mode da iken sayfa yenilendiğinde dark mode a tekrar geçmesin.
