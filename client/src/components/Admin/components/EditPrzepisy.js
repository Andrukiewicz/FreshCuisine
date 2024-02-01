import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditPrzepisyMutation } from "../../../features/przepisyApiSlice";
import { selectAllSkladniki } from "../../../features/skladnikiApiSlice";

import Error from "../../Notifications/Error";
import Success from "../../Notifications/Success";
import axios from "axios";
import { usePageTitleAdmin } from "../../../hooks/usePageTitle";

export default function Editprzepisy({ przepisy }) {
  usePageTitleAdmin(przepisy.name);

  const [editPrzepisy, { isLoading, isSuccess, isError, error, data }] =
    useEditPrzepisyMutation();

  const skladniki = useSelector((state) => selectAllSkladniki(state));

  const skladnikiReduced = skladniki.map(({ _id, cena, name }) => ({
    _id,
    cena,
    name,
  }));

  const navigate = useNavigate();

  const [name, setName] = useState(przepisy.name);
  const [category, setCategory] = useState(przepisy.category);
  const [opis, setOpis] = useState(przepisy.opis);
  const [karty, setKarty] = useState(przepisy.karty);
  const [zdjecia, setZdjecia] = useState(przepisy.zdjecia);
  const [imageName, setImageName] = useState(przepisy.imageName);

  const [file, setFile] = useState();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/przepisy", {
        state: {
          data,
        },
      });
    }
  }, [isSuccess, navigate, data]);

  const formHandler = async (e) => {
    e.preventDefault();

    const editedprzepisy = {
      _id: przepisy.id,
      name,
      category,
      opis,
      imageName,
      karty,
      zdjecia,
      skladniki: skladnikiList,
    };
    // console.log(editedprzepisy)
    await editPrzepisy({ editedprzepisy });
  };

  const [skladnikiList, setSkladnikiList] = useState(przepisy.skladniki);

  // handle input change
  const handleNameChange = (e, i) => {
    const { value } = e.target;
    const { _id, name } = JSON.parse(value); // Parse the object and extract _id and name
    const list = [...skladnikiList];
    list[i] = {
      _id,
      name,
      value: skladnikiList[i].value,
      jednostka: skladnikiList[i].jednostka,
    };
    setSkladnikiList(list);
  };
  const handleValueChange = (e, i) => {
    const valueparse = e.target.value; // Parse the object and extract _id and name
    const list = [...skladnikiList];
    list[i] = {
      _id: skladnikiList[i]._id,
      name: skladnikiList[i].name,
      value: valueparse,
      jednostka: skladnikiList[i].jednostka,
    };
    setSkladnikiList(list);
  };

  const handleJednostkaChange = (e, i) => {
    const valueparse = e.target.value; // Parse the object and extract _id and name
    const list = [...skladnikiList];
    list[i] = {
      _id: skladnikiList[i]._id,
      name: skladnikiList[i].name,
      value: skladnikiList[i].value,
      jednostka: valueparse,
    };
    setSkladnikiList(list);
  };

  // handle click e of the Remove button
  const handleRemoveSkladniki = (index) => {
    const list = [...skladnikiList];
    list.splice(index, 1);
    setSkladnikiList(list);
  };

  // handle click e of the Add button
  const handleAddSkladniki = () => {
    setSkladnikiList([
      ...skladnikiList,
      {
        _id: skladnikiReduced[0]._id,
        name: skladnikiReduced[0].name,
        value: 1,
        jednostka: "sztuka",
      },
    ]);
  };

  const sortedSkladniki = skladnikiReduced.sort((a, b) =>
    a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase(), "pl", { sensitivity: "base" })
  );

  const handleZdjecia = () => {
    setZdjecia(!zdjecia);
  };

  const handleKarty = () => {
    setKarty(!karty);
  };

  const imageUpload = (e) => {
    const data = new FormData();
    data.append("file", file);

    axios
      .post("http://localhost:8080/uploadimage", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col">
      <h5>Edytuj przepis</h5>
      <form onSubmit={formHandler}>
        <div className="mx-2 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-5">
            <label className="flex text-2xl" htmlFor="name">
              Nazwa przepisu
            </label>
            <input
              className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-base"
              type="text"
              id="name"
              name="name"
              placeholder="Nazwa przepisu"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex flex-col items-center gap-5">
            <label htmlFor="imageName">Zdjęcie</label>
            {imageName ? (
              <img
                className="mx-auto flex max-w-[10rem]"
                src={`https://3klik.pl/images/przepisy/${przepisy.imageName}`}
                alt="Zdjecie przepisu"
              />
            ) : (
              ""
            )}
            <input
              className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-sm"
              type="text"
              id="imageName"
              name="imageName"
              placeholder="Nazwa pliku"
              value={imageName || ""}
              readOnly
            ></input>
            <div className="flex w-full flex-row justify-center">
              <input
                type="file"
                id="file"
                className="appearance-none rounded-l-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-sm"
                accept=".png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                  setImageName(file.name);
                }}
              />
              <button
                type="button"
                className="flex items-center justify-center rounded-r-lg border border-transparent bg-klik px-8 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight md:px-2"
                onClick={imageUpload}
              >
                Prześlij
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center p-5">
            <label className="mx-auto flex-row" htmlFor="imageName">
              Sprawdzić
            </label>
            <div className="flex flex-row">
              <div className="mx-2">
                <label htmlFor="zdjecia">Zdjęcia</label>
                <input
                  className="ml-2 h-6 w-6 rounded border-kliklight p-2 text-klik focus:ring-2 focus:ring-kliklight dark:border-klikdark dark:ring-offset-neutral-800 dark:focus:ring-kliklight"
                  type="checkbox"
                  id="zdjecia"
                  name="zdjecia"
                  checked={zdjecia ? true : false}
                  onChange={handleZdjecia}
                ></input>
              </div>
              <div className="mx-2">
                <label htmlFor="karty">Karta PDF</label>
                <input
                  className="ml-2 h-6 w-6 rounded border-kliklight p-2 text-klik focus:ring-2 focus:ring-kliklight dark:border-klikdark dark:ring-offset-neutral-800 dark:focus:ring-kliklight"
                  type="checkbox"
                  id="karty"
                  name="karty"
                  checked={karty ? true : false}
                  onChange={handleKarty}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label className="flex items-center" htmlFor="category">
              Kategoria
            </label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/2 sm:text-sm"
              name="category"
              id="category"
            >
              <option value="BRAK KATEGORII">Wybierz kategorię</option>
              <option value="Mięsny">Mięsny</option>
              <option value="Wege">Wege</option>
            </select>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-lg bg-neutral-100 p-5 dark:bg-neutral-800">
            <span className="mx-auto flex">Składniki</span>
            {skladnikiList.length === 0 && (
              <button
                className="flex items-center justify-center rounded-lg border border-transparent bg-klik px-8 py-2 text-base text-white transition-transform hover:scale-105 hover:bg-kliklight"
                onClick={handleAddSkladniki}
              >
                Dodaj
              </button>
            )}
            {skladnikiList.map((item, i) => {
              return (
                <div key={i} className="flex flex-col">
                  <div className="my-2 flex flex-col gap-1 sm:flex-row sm:gap-0">
                    <select
                      className="w-full appearance-none rounded-md rounded-l-none border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-3/5 sm:rounded-none sm:rounded-l-md sm:text-sm"
                      id={`name-${i}`}
                      name={`name-${i}`}
                      value={
                        JSON.stringify({ _id: item._id, name: item.name }) || ""
                      }
                      onChange={(e) => handleNameChange(e, i)}
                    >
                      {sortedSkladniki.map((x, y) => {
                        return (
                          <option
                            value={JSON.stringify({ _id: x._id, name: x.name })}
                            key={y}
                          >
                            {x.name} | {x.cena}zł
                          </option>
                        );
                      })}
                    </select>
                    <input
                      type="number"
                      id={`value-${i}`}
                      name={`value-${i}`}
                      placeholder="ilość"
                      className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/5 sm:rounded-none sm:text-sm"
                      value={item.value || ""}
                      onChange={(e) => handleValueChange(e, i)}
                    />
                    <select
                      className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:w-1/5 sm:rounded-none sm:text-sm"
                      id={`jednostka-${i}`}
                      name={`jednostka-${i}`}
                      value={item.jednostka || ""}
                      onChange={(e) => handleJednostkaChange(e, i)}
                    >
                      <option value="litr" key="1">
                        litr
                      </option>
                      <option value="kilogram" key="2">
                        kilogram
                      </option>
                      <option value="sztuka" key="3">
                        sztuka
                      </option>
                    </select>
                    {skladnikiList.length !== 0 && (
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="mt-4 flex items-center justify-center rounded-md rounded-r-none border border-transparent bg-klik p-2 text-sm text-white transition-transform hover:scale-105 hover:bg-kliklight sm:mt-0 sm:rounded-none sm:rounded-r-lg"
                          onClick={() => handleRemoveSkladniki(i)}
                        >
                          Usuń
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {skladnikiList.length - 1 === i && (
                      <button
                        className="flex items-center justify-center rounded-lg border border-transparent bg-klik px-8 py-2 text-base text-white transition-transform hover:scale-105 hover:bg-kliklight"
                        onClick={handleAddSkladniki}
                      >
                        Dodaj
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {/* <div>
              <pre>{JSON.stringify(skladnikiList, null, 2)}</pre>
            </div> */}
          </div>
          <div className="flex flex-col items-center">
            <label className="mx-auto mb-2 flex text-2xl" htmlFor="opis">
              Opis
            </label>
            <textarea
              rows="10"
              className="w-full resize-none appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-kliklight focus:outline-none focus:ring-kliklight dark:border-neutral-600 dark:bg-neutral-800 dark:text-white sm:text-sm"
              type="text"
              id="opis"
              name="opis"
              placeholder="Opis przepisu"
              value={opis}
              onChange={(e) => {
                setOpis(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center p-5">
          <button
            className="flex items-center justify-center rounded-lg border border-transparent bg-klik px-8 py-2 text-base text-white transition-transform hover:scale-105 hover:bg-kliklight"
            type="submit"
          >
            Zapisz produkt
          </button>
        </div>
      </form>
      {isSuccess ? <Success success={data?.message} /> : ""}
      {isError ? <Error error={error?.data} /> : ""}
    </div>
  );
}
