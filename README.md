
React hook formun kontrolü sevmesinin sebebi : her seferinde her harfte kontrol edilir ise iş yükü artıyor böylece yorucu oluyor. Büyük formlarda acayip performans farkı sağlar . 
useState , onChange , value kontrollüdürler.
Submit olunca bilgileri DOM’dan tek seferde ref kullanarak alıyor. 

@neonapps.com ile bittiğini kontrol etmesi için email in endsWith ini kontrol ediyoruz.
Regex ile de kontrol edebiliriz (teknofest projemde büyük ihtimalle regex kullanmıştım)
Refine ile zorunluluk ekliyoruz.

Parse alarm veriyor . Çalışmayı durduruyor.Bu yüzden backend, abi girişlerinde , configlerde kullanılmalı . Çünkü bir hata varsa hiç çalışmasın isteriz.(try-catch)

safeParse ise form validation , kullanıcıdan gelen veri ve tasarım konusunda daha faydalı olur. Hata mesajlarını kendimiz okuyup düzeltiriz .(if-else)

Regex = ^[^\s@]+@[^\s@]+\.[^\s@]+$
[^\s@]+    = kullanıcı adı demek
@     = bildiğimiz @
[^\s@]+     = domain adı
\.     = bildiğimiz nokta
[^\s@]+     = com vs.


Yaptıklarım : 
TypeScript tanım
Kurulum
Temel tipler
Any kullanımı 
Union types 
Literal types
Array
Object
İnterface ve type kullanımı 
Optinal types
Function
Generic types
Inheritance
Partial ,required , Readonly, pick , omit

Enumlar Read onlydir değeri değiştirilemez. 
