import { useSelector } from "react-redux"
import { selectKalkulatorById } from "../../../features/kalkulatorApiSlice"
import { usePageTitleAdmin } from "../../../hooks/usePageTitle"

export default function Kalkulator({ kalkulatorId, index, isPakowanie }) {
  usePageTitleAdmin("Kalkulator")
  const kalkulator = useSelector((state) =>
    selectKalkulatorById(state, kalkulatorId)
  )

  if (kalkulator) {
    return (
      <tr
        key={index}
        className='bg-neutral-200 text-sm even:bg-neutral-300 dark:bg-neutral-900 dark:even:bg-neutral-800 sm:text-base'
      >
        <td className='hidden border border-neutral-600 p-3 text-center md:table-cell'>
          {index + 1}
        </td>
        <td className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {kalkulator.name}
        </td>
        {!isPakowanie ? (
          <>
            <td className='hidden border border-neutral-600 p-3 md:table-cell'>
              <p>{kalkulator.producent}</p>
            </td>
          </>
        ) : (
          <>
            <td className='border border-neutral-600 text-center p-1 font-normal sm:w-auto sm:p-3'>
              {kalkulator.ilosc}
            </td>
            <td className='border border-neutral-600 text-center p-1 font-normal sm:w-auto sm:p-3'>
              {kalkulator.jednostka === "kilogram"
                ? (kalkulator.value * 1000).toFixed(3).replace(/\.0{2,}$/, "") +
                  "g"
                : kalkulator.jednostka === "sztuka" && kalkulator.value >= 1
                ? kalkulator.value.toFixed(0)
                : kalkulator.jednostka === "litr"
                ? (kalkulator.value * 1000).toFixed(0) + "ml"
                : kalkulator.value.toFixed(3).replace(/\.0{2,}$/, "")}
            </td>
          </>
        )}
        <td className='border border-neutral-600 p-1 text-center sm:w-auto sm:p-3'>
          {kalkulator.jednostka === "kilogram"
            ? (kalkulator.value * kalkulator.ilosc * 1000)
                .toFixed(3)
                .replace(/\.0{2,}$/, "") + "g"
            : kalkulator.jednostka === "sztuka" && kalkulator.value >= 1
            ? (kalkulator.value * kalkulator.ilosc).toFixed(0)
            : kalkulator.jednostka === "litr"
            ? (kalkulator.value * kalkulator.ilosc * 1000).toFixed(0) + "ml"
            : (kalkulator.value * kalkulator.ilosc)
                .toFixed(3)
                .replace(/\.0{2,}$/, "")}
        </td>
        <td className='border border-neutral-600 p-1 sm:w-auto sm:p-3'>
          {kalkulator.cena}
        </td>
      </tr>
    )
  } else return null
}
