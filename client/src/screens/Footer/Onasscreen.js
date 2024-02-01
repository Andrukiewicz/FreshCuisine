import React from "react"
import { usePageTitle } from "../../hooks/usePageTitle"

export default function Onasscreen() {
  usePageTitle("O nas")
  return (
    <div className='mx-auto max-w-2xl py-4 px-4 sm:py-24 sm:px-6 md:py-16 lg:max-w-7xl lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='flex w-full flex-col items-center justify-center gap-5 lg:max-w-7xl lg:px-8'>
          <h1 className='text-2xl font-bold'>O nas</h1>
          <div className='flex flex-col gap-5 sm:flex-row'>
            <div className='neutral-200 flex w-full items-center rounded-md p-5 text-center dark:bg-neutral-800 sm:w-1/2'>
              <p>
                Zawsze usiłowaliśmy odżywiać się zdrowo i kolorowo. Dlaczego
                "usiłowaliśmy"?, bo z braku czasu, częściej niż tego chcieliśmy,
                z wyrzutami sumienia kupowaliśmy “cokolwiek” w pobliskim
                supermarkecie…
              </p>
            </div>
            <div className='neutral-200 flex w-full items-center rounded-md p-5 text-center dark:bg-neutral-800 sm:w-1/2'>
              <p>
                "Usiłowaliśmy" również dlatego, że próby "upolowania" zdrowych
                lokalnych produktów, wyjazdu za miasto do rolnika i wyprawy na
                bazar zajmowały nam tak wiele czasu, że po kolejnej "porażce"
                gdy niestety nie zdążyliśmy się już złapać bo "pani Krysia”
                wszystko wyprzedała, postanowiliśmy coś z tym zrobić.
              </p>
            </div>
          </div>
          <div className='flex w-full flex-col items-center gap-5 rounded-md bg-neutral-200 p-5 dark:bg-neutral-800'>
            {/* <p className='text-xl font-bold'>
              Nasza firma zrodziła się z uczuć głęboko ludzkich - z miłości i
              nienawiści, ze wstrętu i sentymentu…:
            </p> */}
            <p className='text-xl font-bold'>
              Nasza firma zrodziła się z uczuć głęboko ludzkich:
            </p>
            <ul className='flex flex-col gap-5 sm:gap-2'>
              <li>
                <b>Z frustracji</b> z powodu ogromu czasu poświęconego na próby
                zakupu świeżej, zdrowej żywności
              </li>
              <li>
                <b>Z pasji</b> do tworzenia zbilansowanych, szybkich i pysznych
                posiłków
              </li>
              <li>
                <b>Ze świadomości</b>, że zdrowie jest najważniejsze bo "jesteś
                tym co jesz"
              </li>
              <li>
                <b>Z wstrętu</b> do sztucznych, pozbawionych smaku, pełnych
                chemii produktów z zagranicznych supermarketów
              </li>
              <li>
                <b>Z sentymentu</b> do naturalnych, pełnych aromatu smaków z
                dzieciństwa
              </li>
              <li>
                <b>Z niechęci</b> sponsorowania producentów produkujących
                opryskiwaną, pełną hormonów, skażoną żywność
              </li>
              <li>
                <b>Z chęci</b> wspierania polskich jak i zagranicznych rolników
                produkujących zdrową żywność
              </li>
              <li>
                <b>Z miłości i szacunku</b> do naszej planety i świadomości
                tego, jak wszystko jest ze sobą połączone
              </li>
            </ul>
          </div>
          <div className='p-5 text-center text-2xl font-bold'>
            <p>
              Wszystko to połączyliśmy w jak najlepszy sposób, dodaliśmy trochę
              tego, tamtego i powstał 3KLIK. Ostatnia książka kucharska jakiej
              potrzebujesz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
