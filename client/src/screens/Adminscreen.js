import React, { useState } from "react"
// import { Route } from "react-router"
import { Route, Routes, NavLink, Link } from "react-router-dom"

// Zestawy
import Productlist from "../components/Admin/Productslist"
import Addproduct from "../components/Admin/Addproduct"
import Editproduct from "../components/Admin/Editproduct"

// Skladniki
import Skladnikilist from "../components/Admin/Skladnikilist"
import Addskladniki from "../components/Admin/Addskladniki"
import Editskladniki from "../components/Admin/Editskladniki"

// Przepisy
import Przepisylist from "../components/Admin/Przepisylist"
import Addprzepisy from "../components/Admin/Addprzepisy"
import Editprzepisy from "../components/Admin/Editprzepisy"

// Zamówienia
import Orderslist from "../components/Admin/Orderslist"

// Producenci
import Producencilist from "../components/Admin/Producencilist"
import Addproducenci from "../components/Admin/Addproducenci"
import Editproducenci from "../components/Admin/Editproducenci"

// Kontrahenci
import Kontrahencilist from "../components/Admin/Kontrahencilist"
import Editkontrahenci from "../components/Admin/Editkontrahenci"
import Addkontrahenci from "../components/Admin/Addkontrahenci"

// Użytkownicy
import Userslist from "../components/Admin/Userslist"
import Mailinglist from "../components/Admin/Mailinglist"

// Kalkulatory
import Kalkulator from "../components/Admin/Kalkulator"
import Pakowanie from "../components/Admin/Pakowanie"

import logo from "../images/logo128.webp"
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  ArchiveBoxIcon,
  Bars3Icon,
  ShoppingCartIcon,
  BeakerIcon,
  NewspaperIcon,
  TruckIcon,
  BugAntIcon,
  CalculatorIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline"
import { usePageTitleAdmin } from "../hooks/usePageTitle"

export default function Adminscreen() {
  usePageTitleAdmin("Admin panel")
  const menus = [
    {
      name: "Lista 3klikaczy",
      link: "users",
      icon: <UserIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Newsletter",
      link: "mailing",
      icon: <EnvelopeIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Zestawy",
      link: "products",
      icon: <ArchiveBoxIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Zamówienia",
      link: "orders",
      icon: <ShoppingCartIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Składniki",
      link: "skladniki",
      icon: <BeakerIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Przepisy",
      link: "przepisy",
      icon: <NewspaperIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Producenci",
      link: "producenci",
      icon: <BugAntIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Dostawcy",
      link: "kontrahenci",
      icon: <TruckIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Kalkulator",
      link: "kalkulator-towaru",
      icon: <CalculatorIcon size={26} className='h-6 w-6' />,
    },
    {
      name: "Pakowanie",
      link: "pakowanie",
      icon: <ArchiveBoxArrowDownIcon size={26} className='h-6 w-6' />,
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div id='app-container' className='flex min-h-screen w-full flex-row'>
      <div className='fixed top-auto bottom-0 right-0 z-50 h-auto max-h-screen sm:sticky sm:right-auto sm:bottom-auto sm:top-0 sm:mb-0 sm:flex sm:h-screen'>
        <div className='p-2 sm:relative xl:px-2'>
          <nav
            className={`noScrollbar relative h-full ${
              open ? "w-48" : "w-16"
            } overflow-x-hidden overflow-y-hidden rounded-3xl bg-neutral-200 p-2 drop-shadow-md transition-all ease-out dark:bg-neutral-800`}
          >
            <div className='flex h-full w-fit flex-col items-center justify-between gap-0 sm:gap-4'>
              <div
                className={`flex w-fit flex-grow flex-col items-center gap-2 text-lg`}
              >
                {open ? (
                  <div className='flex w-full items-center'>
                    <button
                      className='flex shrink-0 justify-end rounded-full bg-klik p-3 text-neutral-900 drop-shadow-md transition-transform'
                      onClick={() => setOpen(!open)}
                    >
                      <XMarkIcon size={18} className='h-6 w-6 cursor-pointer' />
                    </button>
                  </div>
                ) : (
                  <div className='flex w-full items-center justify-between'>
                    <button
                      className='flex shrink-0 rotate-180 rounded-full bg-klik p-3 drop-shadow-md transition-transform'
                      onClick={() => setOpen(!open)}
                    >
                      <Bars3Icon size={18} className='h-6 w-6 cursor-pointer' />
                    </button>
                  </div>
                )}
                {menus?.map((menu, i) => (
                  <NavLink
                    to={menu?.link}
                    key={i}
                    title={menu?.name}
                    onClick={() => setOpen(false)}
                    className={` ${menu?.margin && "mt-5"} group ${
                      !open && "hidden sm:flex"
                    } flex w-full items-center justify-start gap-4 overflow-hidden rounded-lg border border-transparent p-2 text-base transition-colors ease-out hover:bg-neutral-200 hover:text-klik hover:dark:bg-neutral-700 sm:p-3`}
                  >
                    <div className='shrink-0 grow-0'>{menu?.icon}</div>
                    <p className='hidden truncate leading-none'>{menu?.name}</p>
                    <h2
                      style={{
                        transitionDelay: `${i + 5}ms`,
                      }}
                      className={`duration-50 overflow-visible whitespace-pre ${
                        !open && "w-0 translate-x-12 overflow-hidden opacity-0"
                      }`}
                    >
                      {menu?.name}
                    </h2>
                  </NavLink>
                ))}
              </div>
              <div className='flex  w-full flex-grow flex-col justify-end'>
                <div className='flex w-full flex-col items-start justify-end font-medium'>
                  <div className='relative hidden text-left !outline-none sm:inline-block md:block'>
                    <div className='!outline-none'>
                      <div
                        className='dropdownButton !outline-none'
                        id='headlessui-menu-button-147'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <div className='flex w-[2.7rem] font-normal'>
                          <div className='h-[70px] w-full'></div>
                        </div>
                        <button className='flex h-11 w-11 items-center justify-center justify-self-start rounded-full border-2 border-klikdark outline-none drop-shadow-md transition-all hover:border-kliklight hover:bg-neutral-200 focus:border-klik  focus:bg-klik focus:outline-none hover:dark:bg-neutral-700'>
                          <span className='box-sizing: border-box; display: inline-block; overflow: hidden; width: 34px; height: 34px; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;'>
                            <Link to='/'>
                              <img
                                alt='3klik logo'
                                className='h-11 w-11 rounded-full'
                                src={logo}
                                decoding='async'
                                data-nimg='fixed'
                              />
                            </Link>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div data-name='Outer container' className='flex w-full p-3'>
        <div
          data-name='Inner container'
          className='relative mx-auto flex w-full flex-col pt-5'
        >
          <Routes>
            <Route path='/' element={<Orderslist />} />
            <Route path='users' element={<Userslist />} />
            <Route path='orders' element={<Orderslist />} />
            <Route path='kalkulator-towaru' element={<Kalkulator />} />
            <Route path='pakowanie' element={<Pakowanie />} />
            <Route path='products' element={<Productlist />} />
            <Route path='addproduct' element={<Addproduct />} />
            <Route path='addskladniki' element={<Addskladniki />} />
            <Route path='editproduct/:productid' element={<Editproduct />} />
            <Route
              path='editskladniki/:skladnikiid'
              element={<Editskladniki />}
            />
            <Route path='addprzepisy' element={<Addprzepisy />} />
            <Route path='editprzepisy/:przepisyid' element={<Editprzepisy />} />
            <Route path='mailing' element={<Mailinglist />} />
            <Route path='skladniki' element={<Skladnikilist />} />
            <Route path='przepisy' element={<Przepisylist />} />
            <Route path='producenci' element={<Producencilist />} />
            <Route path='addproducenci' element={<Addproducenci />} />
            <Route
              path='editproducenci/:producenciid'
              element={<Editproducenci />}
            />
            <Route path='Kontrahenci' element={<Kontrahencilist />} />
            <Route path='addkontrahenci' element={<Addkontrahenci />} />
            <Route
              path='editkontrahenci/:kontrahenciid'
              element={<Editkontrahenci />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}
