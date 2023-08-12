import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  UserPlusIcon,
  ExclamationCircleIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import dataControllers from "../../api/requests";
import { NavLink } from "react-router-dom";
function Dashboard() {
  const [cpage, setCpage] = useState(1);
  const d = new Date();
  const date = d.toDateString();
  const [open, setOpen] = useState(false);
  const [openview, setOpenview] = useState(false);
  const [dataview, setDataView] = useState({});
  const [search, setSearch] = useState("");
  const initialState = {
    name: "",
    class: "",
    father: "",
    mobile: "",
    attend: [],
  };
  const [data, setData] = useState(initialState);
  const cancelButtonRef = useRef(null);
  const { user } = useUser();
  const month = date.split(" ")[1];

  const [studens, setStudents] = useState([]);
  const name = user.fullName;
  const perpage = 6;
  const lastIndex = cpage * perpage;
  const firstIdex = lastIndex - perpage;
  const records = studens.slice(firstIdex, lastIndex);
  const numpage = Math.ceil(studens.length / perpage);
  const number = [...Array(numpage + 1).keys()].slice(1);

  const getStudent = () => {
    try {
      dataControllers.studentList().then((res) => {
        setStudents(res.data.students);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const attendData = (arr, str) => {
    let newArray = arr.filter(
      (el) => el.attend == str && el.date.split(" ")[1] == month
    );
    return newArray.length;
  };

  const attendSave = (str, _id) => {
    try {
      dataControllers
        .stutendAttend(_id, {
          date: date,
          attend: str,
        })
        .then(() => {
          getStudent();
          toast.success("attend is successfully save..", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    try {
      dataControllers.addStudent(data).then(() => {
        setOpen(false);
        getStudent();
      });
    } catch {}
  };

  const ViewStudent = (obj) => {
    setDataView(obj);
    setOpenview(true);
  };
  const nextPage = () => {
    if (cpage !== numpage) {
      setCpage(cpage + 1);
    }
  };
  const prePage = () => {
    if (cpage !== 1) {
      setCpage(cpage - 1);
    }
  };
  const changePage = (n) => {
    setCpage(n);
  };
  const LastPage=()=>{
    setCpage(numpage)
  }
  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div>
      <div className="h-18 w-full text-white flex justify-between items-center px-2 p-3 bg-gray-900">
        <div className="flex gap-2 items-center">
          <AcademicCapIcon className="h-5 w-5 " /> Education{" "}
        </div>
        <div className="flex gap-4 items-center">
          <p >Payments(<span className="text-green-600">Comming Soon..</span>)</p>
          <div className="text-sm">{name}</div>
          <UserButton />
        </div>
      </div>

      {/* table data */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Students
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the students in your account including their name,
              mobile, Father and class.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none  items-center flex gap-3">
            <div>
              <div className="relative mt-2 flex items-center">
                <input
                  type="text"
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                  id="search"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                    Search
                  </kbd>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="block rounded-md bg-gray-800 px-3 py-2 text-center text-sm  text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Father Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Mobile
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Attendance
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Attendance
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {records
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((person, i) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.class}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.father}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.mobile}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-4">
                          <CheckIcon
                            onClick={() =>
                              person.attend.findIndex((p) => p.date == date) !=
                              1
                                ? attendSave("Y", person._id)
                                : toast.error("Already Attendance")
                            }
                            //
                            className="h-4  text-green-500 w-4 cursor-pointer "
                          />
                          <XMarkIcon
                            className="h-4 w-4 text-rose-500  cursor-pointer "
                            onClick={() =>
                              person.attend.findIndex((p) => p.date == date) !=
                              1
                                ? attendSave("N", person._id)
                                : toast.error("Already Attendance")
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {attendData(person.attend, "Y")}/
                          {attendData(person.attend, "N")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a
                            href="#"
                            className="text-indigo-600 flex gap-2 hover:text-indigo-900"
                          >
                            <EyeIcon
                              className="h-5 w-5"
                              onClick={() => ViewStudent(person)}
                            />{" "}
                            <CurrencyRupeeIcon
                              className="h-5 w-5"
                              onClick={() =>alert("pay")}
                            />{" "}
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
             {records?<>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <NavLink
                  onClick={prePage}
                  to="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </NavLink>
                {number.map((n, i) => (
                  <NavLink
                    key={i}
                    to=""
                    onClick={() => changePage(n)}
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    {n}
                  </NavLink>
                ))}
                <NavLink
                  onClick={LastPage}
                  to="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  Last Page
                </NavLink>

                <NavLink
                  onClick={nextPage}
                  to="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </NavLink>
              </nav>
             </>:<></>}
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <UserPlusIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <form onSubmit={submitForm}>
                        <div className=" grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                          <div className="sm:col-span-6 text-left">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-1">
                              <input
                                name="name"
                                type="text"
                                onChange={(e) =>
                                  setData({ ...data, name: e.target.value })
                                }
                                autoComplete="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-6 text-left">
                            <label
                              htmlFor="fathername"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Father Name
                            </label>
                            <div className="mt-1">
                              <input
                                name="fathername"
                                onChange={(e) =>
                                  setData({ ...data, father: e.target.value })
                                }
                                type="text"
                                autoComplete="fathername"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 text-left">
                            <label
                              htmlFor="fathername"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Class
                            </label>
                            <div className="mt-1">
                              <input
                                name="fathername"
                                type="text"
                                onChange={(e) =>
                                  setData({ ...data, class: e.target.value })
                                }
                                autoComplete="fathername"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3 text-left">
                            <label
                              htmlFor="fathername"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Mobile
                            </label>
                            <div className="mt-1">
                              <input
                                name="fathername"
                                onChange={(e) =>
                                  setData({ ...data, mobile: e.target.value })
                                }
                                type="text"
                                autoComplete="fathername"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid  sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-gray-800 px-3  py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:col-start-2"
                          >
                            Addmition Add
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openview} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenview}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div class="px-4 sm:px-0">
                      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Personal details and application.
                      </p>
                    </div>
                    <div class="mt-2 border-t border-gray-100">
                      <dl class="divide-y divide-gray-100">
                        <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt class="text-sm font-medium leading-6 text-gray-900">
                            Full name
                          </dt>
                          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {dataview.name}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt class="text-sm font-medium leading-6 text-gray-900">
                            Father
                          </dt>
                          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {dataview.father}
                          </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt class="text-sm font-medium leading-6 text-gray-900">
                            Mobile
                          </dt>
                          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {dataview.mobile}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt class="text-sm font-medium leading-6 text-gray-900">
                            Class
                          </dt>
                          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {dataview.class}
                          </dd>
                        </div>
                        <div class="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                          <dt class="text-sm font-medium leading-6 text-gray-900">
                            Paid/UnPiad
                          </dt>
                          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {"0/0"}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid  sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-gray-800 px-3  py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 sm:col-start-2"
                        onClick={() => setOpenview(false)}
                        ref={cancelButtonRef}
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setOpenview(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Dashboard;
