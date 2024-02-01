import React from "react"
import { Disclosure, Transition } from "@headlessui/react"

export default function Regulaminscreen() {
  return (
    <div className='mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 md:py-16 lg:max-w-7xl lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='text-2xl font-bold'>
              Regulamin sprzedaży dla umów zawieranych na odległość
            </h3>
            <h4 className='text-base text-neutral-500 dark:text-neutral-500'>
              Obowiązuje od 1 lutego 2022 roku
            </h4>
          </div>
          <div className='flex w-full flex-col lg:max-w-7xl lg:px-8'>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>Ogólne</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='rounded-b-md p-5 text-sm'>
                      <p>
                        Sklep internetowy dostępny pod adresem
                        https://www.3klik.pl (zwany dalej „Sklepem
                        internetowym”) jest własnością 3klik s.c., adres e-mail:
                        kontakt@3klik.pl, telefon: 796 445 923. Niniejszy
                        regulamin określa rodzaje i zakres świadczenia usług
                        drogą elektroniczną za pośrednictwem Sklepu
                        internetowego, zasady zawierania umów za pomocą Sklepu
                        internetowego, zasady wykonywania tych umów, prawa i
                        obowiązki Klienta i Usługodawcy oraz tryb odstąpienia od
                        umowy i postępowania reklamacyjnego.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>I. Definicje</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Sklep internetowy/Sklep – sklep internetowy dostępny pod
                        adresem https://www.3klik.pl
                      </p>
                      <p>
                        Sprzedawca – 3klik s.c., ul. Konarskiego 25, 11-500
                        Giżycko
                      </p>
                      <p>
                        Produkt – usługa przygotowania zestawu składników
                        potrzebnych do ugotowania potraw wraz z przepisem oraz
                        ich dostawa – dania są szczegółowo wskazane na stronie
                        internetowej Sklepu, realizowana przez Sprzedawcę na
                        warunkach określonych w niniejszym Regulaminie.
                      </p>
                      <p>
                        Zestaw – zestaw składników i przepisów do przygotowania
                        dań. Zestawy różnią się od siebie rodzajem i ilością dań
                        oraz ilością składników zgodnie z ich opisem w Sklepie
                        internetowym na podstronie https://3klik.pl/koszyk po
                        dodaniu zestawów ze strony głównej do koszyka.
                      </p>
                      <p>
                        Klient – osoba fizyczna posiadająca pełną zdolność do
                        czynności prawnych, a w wypadkach przewidzianych przez
                        przepisy powszechnie obowiązujące także osoba fizyczna
                        posiadająca ograniczoną zdolność do czynności prawnych
                        lub osoba prawna albo jednostka organizacyjna
                        nieposiadająca osobowości prawnej, której ustawa
                        przyznaje zdolność prawną, która zawarła lub zamierza
                        zawrzeć Umowę Sprzedaży ze Sprzedawcą.
                      </p>
                      <p>
                        Konsument – Klient, będący konsumentem w rozumieniu
                        ustawy o prawach konsumenta.
                      </p>
                      <p>
                        Przedsiębiorca – osoba fizyczna, osoba prawna lub
                        jednostka nieposiadająca osobowości prawnej, nabywająca
                        produkty w Sklepie internetowym w ramach działalności
                        gospodarczej lub zawodowej.
                      </p>
                      <p>
                        Usługa – usługi elektroniczne świadczone przez
                        Sprzedawcę za pośrednictwem Sklepu internetowego
                      </p>
                      <p>
                        Umowa – umowa zawierana na odległość pomiędzy Klientem a
                        Sprzedawcą za pomocą Sklepu internetowego, której
                        przedmiotem jest zamówienie przez Klienta Produktu.
                      </p>
                      <p>
                        Konto klienta – Usługa elektroniczna świadczona przez
                        Usługodawcę: zbiór informacji przypisanych
                        Zarejestrowanemu Użytkownikowi, które podał Usługodawcy
                        podczas uzupełniania Formularza rejestracji i składania
                        Zamówienia. Zbiór jest dostępny dla Zarejestrowanego
                        Użytkownika po zalogowaniu.
                      </p>
                      <p>
                        NASZE DANIA – podstrona internetowa Sklepu prezentująca
                        dostępne w danym okresie rodzaje dań, które Klient może
                        wybrać do zamawianego Zestawu.
                      </p>
                      <p>
                        Zamówienie – Usługa elektroniczna świadczona przez
                        Usługodawcę: oświadczenie woli klienta, kończące
                        wypełnianie Formularzu zamówienia poprzez naciśnięcie
                        przycisku „zamawiam z obowiązkiem zapłaty”.
                      </p>
                      <p>
                        Formularz rejestracji – formularz dostępny w Sklepie
                        umożliwiający utworzenie Konta klienta.
                      </p>
                      <p>
                        Koszyk – element oprogramowania Sklepu, w którym
                        widoczne są wybrane przez Klienta Produkty do zakupu, a
                        także istnieje możliwość ustalenia i modyfikacji danych
                        Zamówienia, w szczególności ilości produktów.
                      </p>
                      <p>
                        Dzień roboczy – jeden dzień od poniedziałku do piątku za
                        wyjątkiem dni ustawowo wolnych od pracy.
                      </p>
                      <p>
                        Ustawa o prawach konsumenta – ustawa z dnia 30 maja 2014
                        r. o prawach konsumenta (Dz. U. 2014, Nr 827).
                      </p>
                      <p>
                        Kodeks Cywilny– ustawa z dnia 23 kwietnia 1964 r. (Dz.
                        U. Nr 16, poz. 93 ze zm.).
                      </p>
                      <p>
                        Regulamin – niniejszy dokument. Sporządzony jest w
                        języku polskim i stanowi wzorzec umowny w rozumieniu
                        przepisów ustawy z dnia 23 kwietnia 1964 r. – Kodeks
                        cywilny. Regulamin określa prawa i obowiązki Klientów
                        oraz Sprzedawcy.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>II. Konto klienta</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Przy składaniu pierwszego zamówienia w Sklepie
                        internetowym, Klient ma możliwość założenia Konta
                        Klienta, za pośrednictwem którego Klient ma m.in. dostęp
                        do historii zamówień, a także możliwość edycji danych
                        profilowych i zmiany hasła.
                      </p>
                      <p>
                        Poza sytuacjami opisanymi w rozdziale IV Regulaminu,
                        Klient ma możliwość dokonania zakupu zestawu bez
                        dokonania rejestracji i założenia Konta Klienta.
                      </p>
                      <p>
                        Klient ma możliwość dokonania rejestracji i założenia
                        Konta Klienta, bez składania zamówienia, za pomocą
                        formularza rejestracji, podając w nim swój adres-email,
                        hasło oraz klikając przycisk „Zarejestruj się”.
                      </p>
                      <p>
                        Po założeniu Konta, Klient otrzymuje potwierdzenie
                        założenia konta na podany przy jego zakładaniu adres
                        e-mail.
                      </p>
                      <p>
                        Loginem użytkownika jest podany przy rejestracji adres
                        e-mail Klienta.
                      </p>
                      <p>
                        Założenie Konta klienta jest bezpłatne i dobrowolne.
                      </p>
                      <p>
                        Klient jest zobowiązany do podania prawdziwych danych
                        przy rejestracji Konta.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>III. Zamówienia</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Informacje o produktach prezentowane w Sklepie
                        internetowym nie stanowią oferty w rozumieniu przepisów
                        Kodeksu cywilnego, stanowią zaproszenie do zawarcia
                        umowy sprzedaży.
                      </p>
                      <p>
                        Produkty oferowane w Sklepie internetowym są wolne od
                        wad fizycznych i prawnych oraz zostały legalnie
                        wprowadzone na rynek polski. Informacja ta jest
                        równoznaczna z zobowiązaniem Sprzedawcy do dostarczenia
                        Klientowi produktów bez wad.
                      </p>
                      <p>
                        Złożenie zamówienia stanowi ofertę w rozumieniu
                        przepisów Kodeksu cywilnego, złożoną Sprzedawcy przez
                        Klienta.
                      </p>
                      <p>
                        Zamówienia można składać na stronie
                        https://www.3klik.pl, za pośrednictwem znajdującego się
                        na niej formularza zamówienia.
                      </p>
                      <p>
                        Za pośrednictwem formularza zamówienia Klient dokonuje
                        wyboru z dostępnych w Sklepie internetowym zestawów:
                      </p>
                      <p>
                        Zestaw mały 2-3os., obejmujący przepisy i składniki do
                        przygotowania dań dla 2 dorosłych osób lub 1 dorosłej i
                        dwójki dzieci.
                      </p>
                      <p>
                        Zestaw duży 3-4os., obejmujący przepisy i składniki do
                        przygotowania dań dla dwojga dzieci i ich super rodziców
                        lub 3 dorosłych osób.
                      </p>
                      <p>
                        Na zestawy, o których mowa w ustępie powyżej składają
                        się składniki spożywcze niezbędne do przygotowania dań,
                        w tym w szczególności warzywa, mięso, nabiał, makarony,
                        kasze, sosy i inne, a także karty przepisów.
                      </p>
                      <p>
                        Zdjęcia Produktów stanowią propozycję podania. Ze
                        względu na charakter sprzedawanych produktów, wygląd dań
                        przygotowanych z zestawów przez Klientów może się różnić
                        od przedstawionych na zdjęciach.
                      </p>
                      <p>
                        Sprzedawca gwarantuje minimum 48 godzinny termin
                        przydatności świeżego mięsa i ryb oraz minimum 72
                        godzinny dla pozostałych produktów od terminu ich
                        dostarczenia do Klienta do czasu ich termicznej obróbki,
                        przy zachowaniu przez Klienta właściwych warunków ich
                        przechowywania.
                      </p>
                      <p>
                        Produkty mogą nieznacznie odbiegać wagą od podanej wagi
                        na stronie Serwisu. Podane ceny są cenami za porcje, a
                        Klient dodając Produkt do wirtualnego koszyka zgadza się
                        na otrzymanie Produktu, którego waga będzie się różnić o
                        +/- 10%.
                      </p>
                      <p>
                        Klient ma możliwość dokonania zamówienia jednorazowego,
                        którego zasady opisane są w rozdziale IV Regulaminu.
                      </p>
                      <p>
                        W ramach zamówienia jednorazowego Klient wybiera rodzaj
                        Zestawu spośród możliwości wskazanych w ust. 5. Klient
                        ma możliwość wyboru jednego lub większej ilości
                        Zestawów.
                      </p>
                      <p>
                        W przypadku niektórych dań, do ich przygotowania
                        wymagane lub opcjonalne są składniki, których Sklep
                        internetowy nie uwzględnia w Zestawach. Składniki te są
                        wymienione w opisie Dania, dostępnym na karcie dania. Są
                        to podstawowe składniki, które zazwyczaj znajdują się w
                        każdym domu (np. wino, mleko, pieprz, sól, olej).
                      </p>
                      <p>
                        Klient, po kliknięciu przycisku "Dodaj" (pode ceną
                        zestawu na stronie głównej) lub tożsamego zostaje
                        przekierowany do koszyka podsumowującego zamówienie a
                        następnie po kliknięciu w przycisk "Przejdź do
                        płatności" do formularza służącego do składania
                        zamówienia, wyboru metody płatności oraz terminu
                        dostawy.
                      </p>
                      <p>
                        Warunkiem złożenia zamówienia jest zapoznanie się i
                        zaakceptowanie niniejszego Regulaminu, co Klient
                        potwierdza przed złożeniem zamówienia poprzez
                        zaznaczenie odpowiedniego pola w formularzu zamówienia.
                      </p>
                      <p>
                        Naciśnięcie na przycisk „Kupuję i płacę” oznacza
                        złożenie przez Klienta zamówienia z obowiązkiem zapłaty.
                      </p>
                      <p>
                        Podstrona NASZE DANIA zawiera prezentację dostępnych
                        rodzajów dań w Sklepie internetowym w danym okresie
                        czasu. NASZE DANIA jest aktualizowane (ulega zmianom –
                        dodawane są nowe i / lub usuwane dostępne wcześniej
                        dania).
                      </p>
                      <p>
                        Wyboru dań Klient dokonuje z Menu, zaś Sklep internetowy
                        gwarantuje dostawę wybranych Produktów.
                      </p>
                      <p>
                        Informacja o całkowitej wartości zamówienia, jest
                        każdorazowo podawana w Sklepie internetowym w trakcie
                        składania zamówienia, w tym przed bezpośrednim
                        zatwierdzeniem i złożeniem przez Klienta zamówienia. Są
                        to całkowite koszty, które Klient zobowiązany jest
                        zapłacić wraz z należnymi podatkami.
                      </p>
                      <p>
                        Po złożeniu zamówienia, Sprzedawca przesyła niezwłocznie
                        Klientowi informację o przyjęciu zamówienia (przyjęcie
                        oferty) na adres poczty elektronicznej (e-mail) podany
                        przy składaniu zamówienia lub powiązany z Kontem
                        klienta. Umowa zostaje zawarta z chwilą przesłania
                        Klientowi przez Sprzedawcę informacji o przyjęciu
                        zamówienia.
                      </p>
                      <p>
                        Klient może składać zamówienia w Sklepie internetowym o
                        każdej porze, przez 24 godziny na dobę, 7 dni w
                        tygodniu. W przypadku złożenia zamówienia w dni
                        niestanowiące dni roboczych, albo też dni ustawowo wolne
                        od pracy zgodnie z ustawą z dnia 18 stycznia 1951 r. o
                        dniach ustawowo wolnych od pracy termin na przyjęcie
                        oferty dla Sprzedawcy rozpoczyna bieg od dnia roboczego
                        następującego bezpośrednio po dniach, o których mowa na
                        wstępie.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>IV. Płatność i cena</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Klient ma możliwość dokonania zapłaty za produkty
                        tytułem złożonego zamówienia za pośrednictwem płatności
                        elektronicznych w systemie pay-by-link. Podmiotem
                        świadczącym obsługę płatności drogą elektroniczną jest
                        Stripe, Inc.
                      </p>
                      <p>
                        W końcowym etapie składania zamówienia można wybrać
                        następującą formę płatności:
                      </p>
                      <p>
                        <ul>
                          <li>
                            Przelewy24 (szybka płatność z większości polskich
                            banków)
                          </li>
                          <li>Karta kredytowa/debetowa</li>
                          <li>BLIK</li>
                        </ul>
                      </p>
                      <p>
                        Ceny podane w Sklepie internetowym są cenami brutto i
                        wyrażone są w złotych polskich.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>V. Faktury elektroniczne</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Akceptując Regulamin Klient wyraża zgodę na wystawienie
                        i przesłanie przez Sprzedawcę faktury w formie
                        elektronicznej w rozumieniu art. 106n ust. 1 ustawy z
                        dnia 11 marca 2004 r. o podatku od towarów i usług (Dz.
                        U. z 20016 r. poz. 710).
                      </p>
                      <p>
                        Faktura elektroniczna przesłana będzie przez Sprzedawcę
                        na adres poczty elektronicznej (e-mail) podany przez
                        Klienta przy składaniu zamówienia lub powiązany z Kontem
                        klienta.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span id='faq-6'>VI. Realizacja zamówienia</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Sprzedawca umożliwia realizację zamówienia i dostawę
                        Produktów na terenie wybranych miast Polski podanych w
                        zakładce Dostawa i płatności. Realizacja zamówienia i
                        dostawy na innym obszarze jest możliwa tylko po
                        wcześniejszym kontakcie i otrzymaniu jednoznacznego
                        potwierdzenia od Sprzedawcy.
                      </p>
                      <p>
                        Realizacja zamówień odbywa się w dniach i godzinach
                        określonych przez Klienta przy składaniu zamówienia,
                        wybranych przez Klienta spośród możliwości
                        zdefiniowanych w formularzu zamówienia.
                      </p>
                      <p>
                        Dostawy odbywają się w ŚRODY, w godzinach od 12 do 22,
                        spośród zdefiniowanych tam możliwości.
                      </p>
                      <p>
                        Sklep internetowy może ustalić z Klientem nowy termin
                        realizacji Zamówienia w przypadku, gdy realizacja
                        Zamówienia w pierwotnym terminie jest niemożliwa ze
                        względu na przyczyny niezależne od Sprzedawcy, a których
                        usunięcie nie jest możliwe, o czym Klient jest
                        niezwłocznie informowany.
                      </p>
                      <p>
                        Zamówiony Produkt może zostać wydany osobie innej
                        aniżeli składającej Zamówienie, a która znajduje się pod
                        adresem wskazanym przez Klienta jako „adres dostawy”.
                      </p>
                      <p>
                        Z chwilą wydania produktu na Kupującego przechodzą
                        korzyści i ciężary związane z rzeczą oraz
                        niebezpieczeństwo jej przypadkowej utraty lub
                        uszkodzenia. W przypadku Przedsiębiorcy za wydanie
                        produktu uważa się powierzenie go przez Sprzedawcę
                        przewoźnikowi lub spedytorowi.
                      </p>
                      <p>
                        Klient będący Przedsiębiorcą jest zobowiązany do
                        sprawdzenia stanu produktu po dostarczeniu przesyłki i w
                        obecności przedstawiciela podmiotu realizującego przewóz
                        lub spedycję. W razie stwierdzenia jakichkolwiek
                        uszkodzeń przesyłki Klient będący Przedsiębiorcą
                        zobowiązany jest spisać stosowny protokół i niezwłocznie
                        skontaktować się ze Sprzedawcą.
                      </p>
                      <p>
                        Zaleca się, aby Klient będący Konsumentem, w miarę
                        możliwości, dokonał sprawdzenia produktu po dostarczeniu
                        przesyłki i w obecności przedstawiciela podmiotu
                        realizującego przewóz lub spedycję. W przypadku
                        stwierdzenia jakichkolwiek uszkodzeń przesyłki zaleca
                        się również, aby Konsument spisał stosowny protokół i
                        niezwłocznie skontaktował się ze Sprzedawcą.
                      </p>
                      <p>
                        Składając zamówienie Klient – zgodnie z postanowieniami
                        niniejszego Regulaminu – dokonuje wyboru miejsca dostawy
                        oraz wybiera termin dostawy. W konsekwencji, Klient
                        zobowiązany jest być obecny we wskazanym przez siebie
                        miejscu i wybranym czasie dostawy.
                      </p>
                      <p>
                        Klient przyjmuje do wiadomości, że Sklep internetowy nie
                        bierze odpowiedzialności za pozostawiony pod wskazanym
                        adresem Produkt oraz, że Sklep internetowy nie ponosi
                        winy za zniszczenia Produktu powstałe z przyczyn od
                        Sklepu internetowego niezależnych.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>VII. Rękojmia za wady | Reklamacja</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Klientowi będącemu Przedsiębiorcą nie przysługują
                        uprawnienia z tytułu rękojmi za wady rzeczy sprzedanej.
                      </p>
                      <p>
                        Wobec Klienta będącego Konsumentem Sprzedawca ponosi
                        odpowiedzialność za wady fizyczne lub prawne rzeczy
                        sprzedanej, na zasadach określonych w art. 556 i
                        kolejnych Kodeksu cywilnego.
                      </p>
                      <p>
                        Reklamacja może zostać złożona przez Klienta będącego
                        Konsumentem drogą mailową na adres: reklamacja@3klik.pl
                      </p>
                      <div className='flex flex-col gap-2'>
                        W przypadku składania reklamacji, Klient powinien podać
                        w zgłoszeniu reklamacyjnym co najmniej:
                        <span>
                          1) imię, nazwisko, adres do korespondencji i dane
                          kontaktowe;
                        </span>
                        <span>
                          2) informacje dotyczące daty zawarcia umowy wraz z
                          potwierdzeniem jej zawarcia;
                        </span>
                        <span>
                          3) informacje i okoliczności dotyczące przedmiotu
                          reklamacji, w szczególności rodzaju i daty wystąpienia
                          wady;
                        </span>
                        <span>
                          4) żądanie dotyczące sposobu rozpoznania reklamacji.
                        </span>
                      </div>
                      <p>
                        Sprzedawca ustosunkuje się do reklamacji Klienta
                        niezwłocznie, nie później niż w terminie 30 dni od dnia
                        jej złożenia, a w przypadku gdy reklamacja dotyczyć
                        będzie żądania z rękojmi za wady w postaci wymiany
                        rzeczy lub usunięcia wady albo obniżenia ceny, nie
                        później niż w terminie 14 dni. Brak ustosunkowania się
                        Sprzedawcy w powyższym terminie oznacza, że Sprzedawca
                        uznał reklamację za uzasadnioną.
                      </p>
                      <p>
                        O sposobie rozpatrzenia reklamacji Klient zostanie
                        powiadomiony pisemnie.
                      </p>
                      <p>
                        W przypadku nieuwzględnienia reklamacji Klient zostanie
                        ponadto pisemnie powiadomiony o tym czy Sprzedawca
                        wyraża, czy też nie, zgodę na pozasądowe rozwiązanie
                        sporu. W przypadku wyrażenia zgody, Sprzedawca wskaże
                        Klientowi podmiot właściwy do pozasądowego rozwiązania
                        sporu.
                      </p>
                      <p>
                        W przypadku uwzględnienia reklamacji za porozumieniem
                        obu stron i wyborze opcji zwrotu pieniędzy w kwocie
                        zamówienia, odliczamy koszty transakcyjne serwisu Stripe
                        (który wykorzystujemy jako nasz system płatności) tj.
                        Kwota zamówienia - 1.5% + 1zł = kwota którą zwracamy.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>VIII. Odstąpienie od umowy</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Zgodnie z art. 38 pkt 4) ustawy z dnia 30 maja 2014 roku
                        o prawach konsumenta, Klientowi będącemu konsumentem nie
                        przysługuje prawo odstąpienia od umowy Zamówienia
                        Produktów, o którym mowa w art. 27 wymienionej ustawy.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>IX. Ochrona Danych Osobowych</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Szczegółowe informacje dotyczące przetwarzania danych
                        osobowych Klientów, oraz informacje dotyczące plików
                        Cookies określone zostały w „Polityce prywatności i
                        Cookies”, dostępnej pod adresem:
                        <a href='https://3klik.pl/polityka-prywatnosci'>
                          Polityka Prywatności
                        </a>
                        , stanowiącej integralną część niniejszego Regulaminu.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>X. Świadczenie usług drogą elektroniczną</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Postanowienia rozdziału X. Regulaminu stanowią regulamin
                        w rozumieniu art. 8 ustawy z dnia 18 lipca 2002 r. o
                        świadczeniu usług drogą elektroniczną.
                      </p>
                      <p>
                        Sprzedawca świadczy za pośrednictwem Sklepu
                        internetowego następujące Usługi elektroniczne:
                      </p>
                      <p>
                        założenie i prowadzenie Konta klienta w Sklepie
                        internetowym,
                      </p>
                      <p>
                        umożliwienie złożenia zamówienia poprzez odpowiedni
                        formularz,
                      </p>
                      <p>
                        Wymagania techniczne niezbędne do współpracy z systemem
                        teleinformatycznym, za pośrednictwem, którego Sprzedawca
                        świadczy Usługi elektroniczne:
                      </p>
                      <p>dostęp do sieci Internet</p>
                      <p>czynne konto poczty elektronicznej,</p>
                      <p>przeglądarka internetowa.</p>
                      <p>
                        Zakazuje się Klientowi dostarczania treści o charakterze
                        bezprawnym.
                      </p>
                      <p>
                        Umowa o świadczenie usług drogą elektroniczną zostaje
                        zawarta z chwilą zarejestrowania przez Kupującego Konta
                        Klienta, a także z chwilą złożenia zamówienia.
                      </p>
                      <p>
                        Umowa o świadczenie usługi elektronicznej polegającej na
                        umożliwieniu złożenia zamówienia poprzez odpowiedni
                        formularz zostaje zawarta na czas oznaczony i ulega
                        rozwiązaniu z chwilą realizacji zamówienia.
                      </p>
                      <p>
                        Umowa o świadczenie usługi elektronicznej polegającej na
                        założeniu i prowadzeniu Konta Klienta w Sklepie
                        internetowym zostaje zawarta na czas nieoznaczony.
                      </p>
                      <p>
                        Kupujący może w każdym czasie i bez wskazywania
                        przyczyny rozwiązać umowę o prowadzenie Konta Klienta, o
                        której mowa w ust. 7 poprzez przesłanie stosownego
                        oświadczenia za pośrednictwem poczty elektronicznej na
                        adres: <a href='mailto:it@3klik.pl'>it@3klik.pl</a>
                      </p>
                      <p>
                        W razie wykrycia wad lub przerw w funkcjonowaniu Sklepu
                        internetowego Klient uprawniony jest do złożenia
                        reklamacji w terminie 7 dni od dnia ujawnienia się wady
                        lub przerwy.
                      </p>
                      <p>
                        Klient może złożyć reklamację za pośrednictwem poczty
                        elektronicznej na adres:{" "}
                        <a href='mailto:reklamacja@3klik.pl'>
                          reklamacja@3klik.pl
                        </a>
                      </p>
                      <p>
                        Sprzedawca rozpatrzy reklamację w terminie nie dłuższym
                        niż 30 dni od dnia jej otrzymania, informując Kupującego
                        niezwłocznie o jej wynikach.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='
                     flex w-full items-center justify-between bg-neutral-200 p-5 text-left text-base font-bold focus:outline-none focus-visible:ring focus-visible:ring-kliklight focus-visible:ring-opacity-75 dark:bg-neutral-800'
                  >
                    <span>XI. Postanowienia końcowe</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-kliklight`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </Disclosure.Button>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel className='flex flex-col gap-5 rounded-b-md p-5 text-sm'>
                      <p>
                        Klienci mogą uzyskać dostęp do niniejszego Regulaminu w
                        każdym czasie za pośrednictwem linku zamieszczonego na
                        stronie Sklepu internetowego. Regulamin może zostać
                        utrwalony, pozyskany i odtworzony poprzez jego
                        wydrukowanie lub zapisanie go na odpowiednim nośniku
                        danych.
                      </p>
                      <p>
                        Jeśli którekolwiek z postanowień niniejszego Regulaminu
                        zostanie uznane za niezgodne z prawem, nieważne lub w
                        inny sposób niewykonalne w zakresie przewidzianym
                        przepisami prawa, to w tym zakresie zostaje ono
                        wyłączone. W pozostałym zakresie Regulamin pozostaje w
                        mocy.
                      </p>
                      <p>
                        Sprzedawca może dokonać zmiany postanowień Regulaminu po
                        uprzednim poinformowaniu Klientów poprzez publikację
                        jednolitego tekstu Regulaminu w Sklepie internetowym.
                        Zmiany Regulaminu lub nowa treść Regulaminu wchodzi w
                        życie po upływie 14 dni od daty umieszczenia nowej
                        treści Regulaminu w Sklepie internetowym.
                      </p>
                      <p>
                        Zamówienia złożone w trakcie obowiązywania poprzedniej
                        wersji Regulaminu będą realizowane zgodnie z jego
                        postanowieniami.
                      </p>
                      <p>
                        Klient będący Konsumentem posiada m.in. następujące
                        możliwości skorzystania z pozasądowych sposobów
                        rozpatrywania reklamacji i dochodzenia roszczeń:
                      </p>
                      <p>
                        jest uprawniony do zwrócenia się do stałego polubownego
                        sądu konsumenckiego działającego przy Inspekcji
                        Handlowej z wnioskiem o rozstrzygnięcie sporu wynikłego
                        z zawartej Umowy;
                      </p>
                      <p>
                        jest uprawniony do zwrócenia się do wojewódzkiego
                        inspektora Inspekcji Handlowej z wnioskiem o wszczęcie
                        postępowania mediacyjnego w sprawie polubownego
                        zakończenia sporu między Klientem a Sprzedawcą;
                      </p>
                      <p>
                        złożyć swoją skargę za pośrednictwem unijnej platformy
                        internetowej ODR, dostępnej pod adresem:{" "}
                        <a
                          href='http://
              ec.europa.eu/consumers/odr/'
                        >
                          Platforma unijna
                        </a>
                        .
                      </p>
                      <p>
                        Ewentualne spory powstałe pomiędzy Sprzedawcą a
                        Klientem, który jest Konsumentem, rozstrzygane będą
                        przez sąd powszechny właściwy zgodnie z przepisami
                        Kodeksu postępowania cywilnego.
                      </p>
                      <p>
                        Ewentualne spory powstałe pomiędzy Sprzedawcą a
                        Klientem, który nie jest Konsumentem w rozumieniu,
                        rozstrzygane będą przez sąd powszechny właściwy ze
                        względu na siedzibę Sprzedawcy.
                      </p>
                      <p>
                        W sprawach nieuregulowanych w niniejszym Regulaminie
                        mają zastosowanie przepisy Kodeksu Cywilnego, przepisy
                        Ustawy o świadczeniu usług drogą elektroniczną, przepisy
                        Ustawy o prawach Konsumenta oraz inne właściwe przepisy
                        prawa polskiego.
                      </p>
                      <p>
                        Będziemy regularnie dokonywać przeglądu i aktualizacji
                        niniejszego dokumentu w związku ze zmianami w przepisach
                        prawa oraz nowymi podejmowanymi przez nas działaniami
                        mającymi na celu podniesienie bezpieczeństwa Twoich
                        danych.
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
          {/* KONIEC DROPDOWN */}
        </div>
      </div>
    </div>
  )
}
