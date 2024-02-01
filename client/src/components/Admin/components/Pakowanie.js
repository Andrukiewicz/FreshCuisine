import { useSelector } from "react-redux"
import { selectPakowanieById } from "../../../features/pakowanieApiSlice"
import { Disclosure, Transition } from "@headlessui/react"

import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

export default function Pakowanie({ pakowanieId, index }) {
  usePageTitleAdmin("Pakowanie")
  const pakowanie = useSelector((state) =>
    selectPakowanieById(state, pakowanieId)
  )

  if (pakowanie) {
    return (
      <tr
        key={index}
        className='bg-neutral-200 even:bg-neutral-300 dark:bg-neutral-900 dark:even:bg-neutral-800 sm:text-lg'
      >
        <td className='p-3 text-center md:table-cell'>{index + 1}</td>
        <td className='text-center sm:w-auto'>
          <Disclosure>
            <Disclosure.Button
              className={`flex w-full justify-center bg-neutral-300 py-2 text-lg font-bold hover:bg-neutral-500 dark:bg-klik/30 hover:dark:bg-neutral-500`}
            >
              {pakowanie._id} ({pakowanie.count})
            </Disclosure.Button>
            <Transition
              enter='transition ease-in-out duration-150 transform'
              enterFrom='opacity-0 -translate-y-6'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in-out duration-50 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-0'
            >
              <Disclosure.Panel className={"text-base"}>
                <table
                  className='table w-full table-auto flex-row rounded-md bg-neutral-200 px-2 dark:bg-neutral-900'
                  key={index}
                >
                  <thead>
                    <tr className='bg-neutral-200 p-1 text-xs dark:bg-neutral-700 sm:text-base'>
                      <th className='border border-neutral-600 md:table-cell'>
                        Nazwa
                      </th>
                      <th className='border border-neutral-600 md:table-cell'>
                        Ilość
                      </th>
                      <th className='border border-neutral-600 md:table-cell'>
                        Jednostka
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pakowanie?.towar.map((skladniki, index) => {
                      return (
                        <tr
                          key={index}
                          className='bg-neutral-200 text-sm even:bg-neutral-300 dark:bg-neutral-900 dark:even:bg-neutral-800 sm:text-base'
                        >
                          <td className='border border-neutral-600 p-2 text-center md:table-cell'>
                            {skladniki.name}
                          </td>
                          <td className='border border-neutral-600 p-2 text-center md:table-cell'>
                            {skladniki.jednostka === "kilogram"
                              ? (skladniki.value * 1000)
                                  .toFixed(3)
                                  .replace(/\.0{2,}$/, "") + "g"
                              : skladniki.jednostka === "sztuka" &&
                                skladniki.value >= 1
                              ? skladniki.value.toFixed(0)
                              : skladniki.jednostka === "litr"
                              ? (skladniki.value * 1000).toFixed(0) + "ml"
                              : skladniki.value
                                  .toFixed(3)
                                  .replace(/\.0{2,}$/, "")}
                          </td>
                          <td className='border border-neutral-600 p-2 text-center md:table-cell'>
                            {skladniki.jednostka}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
        </td>
        <td className='p-3 text-center font-bold md:table-cell'>
          {pakowanie.count}
        </td>
      </tr>
    )
  } else return null
}
