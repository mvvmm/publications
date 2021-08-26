import { Popover, Fragment, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { usePublications } from "./publicationsContext";

export default function ProgramSelector() {
  const context = usePublications();
  const classes = {
    human:
      "text-programs-human-100 shoadow-sm focus:border-programs-human-100 focus:ring-programs-human-80",
    plant:
      "text-programs-plant-100 shoadow-sm focus:border-programs-plant-100 focus:ring-programs-plant-80",
    energy:
      "text-programs-energy-100 shoadow-sm focus:border-programs-energy-100 focus:ring-programs-energy-80",
    transportation:
      "text-programs-transportation-100 shoadow-sm focus:border-programs-transportation-100 focus:ring-programs-transportation-80",
  };
  const text = {
    human: "Human Health",
    plant: "Plant Health",
    energy: "Energy Efficiency",
    transportation: "Transportation Safety",
  };
  return (
    <Popover className="relative m-2">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open
                ? "border-barbiePink-100 bg-barbiePink-10 text-barbiePink-100 ring-barbiePink-60 ring-opacity-70 ring-2"
                : "text-black-60"
            } rounded-full border border-black-20 px-4 py-1 font-medium flex hover:text-barbiePink-100 ms-focus-barbiePink`}
          >
            Program
            {open ? (
              <ChevronUpIcon className="ml-2 w-6 text-barbiePink-100" />
            ) : (
              <ChevronDownIcon className="ml-2 w-6 text-barbiePink-100" />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {open && (
              <Popover.Panel className="absolute z-10 mt-4 w-max bg-white-100">
                <div className="relative p-4 rounded-lg shadow-lg ring-1 ring-black-100 ring-opacity-5">
                  <div className="mb-2">
                    {context.allPrograms.map((program) => {
                      return (
                        <div key={program}>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              className={`cursor-pointer rounded border-black-20 ${classes[program]} focus:ring focus:ring-offset-0  focus:ring-opacity-50 form-checkbox w-5 h-5`}
                              type="checkbox"
                              checked={context.programIsSelected(program)}
                              onChange={() => {
                                context.toggleProgram(program);
                              }}
                            />
                            <span className="ml-4 text-black-60 font-medium">
                              {text[program]}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-full flex text-sm text-barbiePink-100 font-medium justify-between">
                    <button
                      className="rounded-lg px-2 py-1 ms-focus-visible-barbiePink active:bg-barbiePink-10"
                      onClick={() => {
                        context.selectAllPrograms();
                      }}
                    >
                      All
                    </button>
                    <button
                      className="rounded-lg px-2 py-1 ms-focus-visible-barbiePink active:bg-barbiePink-10"
                      onClick={() => {
                        context.deselectAllPrograms();
                      }}
                    >
                      None
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            )}
          </Transition>
        </>
      )}
    </Popover>
  );
}
