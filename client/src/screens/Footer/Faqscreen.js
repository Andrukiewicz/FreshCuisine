import React from "react"

import { usePageTitle } from "../../hooks/usePageTitle"

export default function Faqscreen() {
  usePageTitle("Q&A")
  return (
    <div className='mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 md:py-16 lg:max-w-7xl lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <div>
            <h1 className='text-2xl font-bold'>
              Q&A - Najczęściej zadawane pytania
            </h1>
          </div>
          <div className='flex flex-col gap-5 [&>*]:rounded-md [&>*]:bg-neutral-200 [&>*]:p-4 [&>*]:dark:bg-neutral-800'>
            <div className='flex flex-col gap-5'>
              <h2 className='text-xl font-bold'>INFORMACJE OGÓLNE</h2>
              <p className='text-lg font-bold'>
                Jak się można z nami skontaktować?
              </p>
              <p>
                Aby skontaktować się z nami, należy napisać wiadomość na
                kontakt@3klik.pl. Można również zadzwonić pod numer 796 445 923.
              </p>
              <p className='text-lg font-bold'>
                Gdzie znajduje się siedziba firmy?
              </p>
              <p>
                Siedziba firmy znajduje się w Giżycku, przy ul. Konarskiego 25A.
              </p>
              <p className='text-lg font-bold'>
                Jak mogę nawiązać współpracę z firmą?
              </p>
              <p>
                Jeśli jesteś zainteresowany/a współpracą z 3klik.pl, prosimy o
                przesłanie swojej oferty na wspolpraca@3klik.pl.
              </p>
              <p className='text-lg font-bold'>
                Jaka jest data ważności produktów?
              </p>
              <p>
                Wszystkie produkty świeże mają nie dłuższy niż 7 dni od daty
                dostarczenia zestawu.
              </p>
            </div>
            <div className='flex flex-col gap-5'>
              <h2 className='text-xl font-bold'>ZAMÓWIENIA</h2>
              <p className='text-lg font-bold'>Czy mogę edytować zamówienie?</p>
              <p>
                Edycja zamówienia jest możliwa. Wystarczy wysłać e-mail na
                zamowienia@3klik.pl i opisać jakie produkty chce się dołożyć do
                zamówienia bądź które z produktów usunąć – należy to zrobić nie
                później niż przed godziną 18:00 w dniu zamówienia.
              </p>
              <p className='text-lg font-bold'>
                Czy jest możliwość anulowania zamówienia?
              </p>
              <p>
                Tak, istnieje możliwość anulowania zamówienia. Jednak może to
                nastąpić nie później niż przed godziną 18:00 w dniu zamówienia.
                Po tej godzinie dostawcy są informowani o zapotrzebowaniu na
                produkty i rozpoczynają przygotowanie produktów specjalnie pod
                Twoje zamówienie. Jeśli chcesz anulować zamówienie, napisz
                wiadomość na adres: zamowienia@3klik.pl.
              </p>
            </div>
            <div className='flex flex-col gap-5'>
              <h2 className='text-xl font-bold'>REKLAMACJA</h2>
              <p className='text-lg font-bold'>
                Gdzie mogę zgłosić reklamację?
              </p>
              <p>
                Reklamacje prosimy zgłaszać na adres e-mail:
                reklamacja@3klik.pl. Należy opisać jakiego produktu dotyczy
                reklamacja, dlaczego reklamujemy dany artykuł oraz jeśli jest to
                możliwe - załączyć zdjęcie.
              </p>
              <p className='text-lg font-bold'>
                Ile trwa rozpatrywanie reklamacji?
              </p>
              <p>
                Na wszystkie zgłoszenia odpowiadamy w dni robocze, w godzinach
                pracy biura, tj. 9:00-18:00. Staramy się, aby reklamacje były
                rozpatrywane w ciągu 24h.
              </p>
              <p className='text-lg font-bold'>
                W jakim terminie należy złożyć reklamację?
              </p>
              <p>
                Reklamację należy zgłosić możliwie jak najszybciej po otrzymaniu
                zamówienia (zdjęcie zrobić w dniu otworzenia paczki). Najpóźniej
                w terminie 14 dni od doręczenia paczki.
              </p>
            </div>
            <div className='flex flex-col gap-5'>
              <h2 className='text-xl font-bold'>OBSŁUGA KLIENTA</h2>
              <p className='text-lg font-bold'>
                Pojawił się błąd na stronie, co robić?
              </p>
              <p>
                Prosimy o przesłanie maila na adres: it@3klik.pl z informacją o
                błędzie oraz z jakiej przeglądarki internetowej i jakiego
                urządzenia korzystałeś/korzystałaś w momencie pojawienia się
                błędu. Jeśli jest taka możliwość, prosimy również o załączenie
                zrzutu ekranu.
              </p>
            </div>
            <div className='flex flex-col gap-5'>
              <h2 id='dostawa' className='text-xl font-bold'>
                DOSTAWA
              </h2>
              <p className='text-lg font-bold'>
                Czy mogę zmienić adres dostawy zamówienia?
              </p>
              <p>
                Tak, zmiana adresu dostawy jest możliwa. Aby to zrobić, należy
                przesłać wiadomość na adres e-mail zamowienia@3klik.pl, bądź
                zadzwonić pod numer 796 445 923, nie później niż przed godziną
                18:00 w dniu zamówienia.
              </p>
              <p className='text-lg font-bold'>Jaki jest koszt dostawy?</p>
              <p>
                Koszt dostawy poza terenem Giżycka i okolic do 5km wynosi 25zł.
              </p>
              <p className='text-lg font-bold'>
                Czy dostarczacie na terenie całego kraju?
              </p>
              <p>
                Nie, zamówienia dostarczamy na adresy dostępne w systemie DPD
                Foods oraz Giżycka i okolic. Możesz sprawdzić czy dostarczamy
                pod twój adres na stronie głównej lub w etapie zamówienia.
                Paczki są dostarczane w środy w godzinach 12-22.
              </p>
              <p className='text-lg font-bold'>
                Czy paczki są zabezpieczane do transportu?
              </p>
              <p>
                Paczki przewożone są w lodówkach z wkładami chłodzącymi. Są
                dodatkowo oklejone taśmą tak, że ciepłe powietrze nie
                przedostaje się do środka.
              </p>
              <p className='text-lg font-bold'>
                Co stanie się z moimi środkami w przypadku braku jednego z
                produktów przy dostawie?
              </p>
              <p>
                W przypadku braku towaru informujemy klienta przed dostawą o
                zaistniałej sytuacji, a środki za brakujące produkty zwracamy na
                konto, z którego otrzymaliśmy płatność.
              </p>
              <p className='text-lg font-bold'>Jak zmienić datę dostawy?</p>
              <p>
                W przypadku zmiany daty dostawy prosimy o wiadomość na
                zamowienia@3klik.pl bądź telefon pod numer 796 445 923, nie
                później niż przed godziną 18:00 w dniu zamówienia.
              </p>
              <p>Czy kurier kontaktuje się z klientem przed dostawą?</p>
              <p>
                Kurierzy zwyczajowo dzwonią do klientów 10-15 minut przed próbą
                dostarczenia paczki, można wtedy również przekazać informację
                np. o nie dzwonienie do drzwi domofonem czy zostawieniu paczki
                przed wejściem.
              </p>
              <p className='text-lg font-bold'>
                Jak i gdzie mogę zostawić uwagi dla kuriera?
              </p>
              <p>
                W końcowym etapie składania zamówienia, na stronie pojawi się
                okno “Dodatkowe informacje dla dostawcy”. Tam można zostawić
                wszystkie ważne informacje do kuriera. Będą one dołączone do
                listu przewozowego.
              </p>
              <p className='text-lg font-bold'>
                Co się stanie z moją paczką, gdy nie dotarła w dniu dostawy?
              </p>
              <p>
                Jeśli z przyczyn od nas niezależnych paczka nie zostanie
                doręczona planowo, kurier ponowi próbę dostarczenia przesyłki w
                kolejnym dniu.
              </p>
            </div>
            <div className='flex flex-col gap-5'>
              <h2 id='platnosc' className='text-xl font-bold'>
                PŁATNOŚĆ
              </h2>
              <p className='text-lg font-bold'>Jakie są sposoby płatności?</p>
              <p>
                W końcowym etapie składania zamówienia można wybrać następującą
                formę płatności:
              </p>
              <ul>
                <li>
                  Przelewy24 (szybka płatność z większości polskich banków)
                </li>
                <li>Karta kredytowa/debetowa</li>
                <li>BLIK</li>
              </ul>
              <p className='text-lg font-bold'>
                Czy jest możliwość płatności gotówką?
              </p>
              <p>Nie ma możliwości płacenia gotówką przy odbiorze.</p>
              <p className='text-lg font-bold'>
                Co się stanie z wpłaconymi przeze mnie środkami w przypadku
                braku towaru?
              </p>
              <p>
                W przypadku braku towaru informujemy klienta przed dostawą o
                zaistniałej sytuacji, a środki przechodzą na kolejne zamówienie
                lub są zwracane na konto klienta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
