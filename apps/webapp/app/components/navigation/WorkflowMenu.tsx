import { Popover, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { Fragment } from "react";
import { useCurrentOrganization } from "~/hooks/useOrganizations";
import { useCurrentWorkflow, useWorkflows } from "~/hooks/useWorkflows";
import { BreadcrumbDivider } from "../layout/Header";

const dimmedClassNames = "text-slate-500";

export function WorkflowMenu() {
  const workflows = useWorkflows();
  const currentWorkflow = useCurrentWorkflow();
  const currentOrganization = useCurrentOrganization();

  if (
    workflows === undefined ||
    currentOrganization === undefined ||
    workflows.length === 0
  ) {
    return <></>;
  }

  return (
    <>
      <BreadcrumbDivider />
      <div className="w-full max-w-max">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : ""}
                inline-flex justify-between items-center rounded text-white bg-transparent pl-2.5 pr-2 py-2 text-sm hover:bg-slate-800 focus:outline-none`}
              >
                <ArrowsRightLeftIcon
                  className={`h-5 w-5 mr-2 ${dimmedClassNames}`}
                  aria-hidden="true"
                />
                <span className="transition">
                  {currentWorkflow ? (
                    <span className="truncate">{currentWorkflow.title}</span>
                  ) : (
                    <span className="truncate">Select Workflow</span>
                  )}
                </span>
                <ChevronUpDownIcon
                  className={`${open ? "" : "text-opacity-70"}
                  ml-1 h-5 w-5 transition duration-150 ease-in-out ${dimmedClassNames}`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 z-30 mt-3 rounded-lg w-screen min-w-max max-w-xs max-h-[70vh] overflow-hidden overflow-y-auto translate-x-0 transform px-4 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-y-1 py-1 bg-slate-700 grid-cols-1">
                      {workflows.map((workflow) => {
                        return (
                          <Popover.Button
                            key={workflow.id}
                            as={Link}
                            to={`/orgs/${currentOrganization.slug}/workflows/${workflow.slug}`}
                            className={classNames(
                              "flex items-center justify-between gap-1.5 mx-1 px-3 py-2 text-white rounded hover:bg-slate-800 transition",
                              workflow.slug === currentWorkflow?.slug &&
                                "!bg-slate-800",
                              workflow.status === "DISABLED" && "opacity-50"
                            )}
                          >
                            <div className="relative flex items-center gap-2">
                              {workflow.status === "CREATED" && (
                                <ExclamationTriangleIcon className="absolute -top-1.5 -left-2.5 h-3.5 w-3.5 text-amber-500" />
                              )}
                              <ArrowsRightLeftIcon
                                className="h-5 w-5 z-100"
                                aria-hidden="true"
                              />
                              <span className="block truncate">
                                {workflow.title}
                              </span>
                            </div>
                            {workflow.slug === currentWorkflow?.slug && (
                              <CheckIcon className="h-5 w-5 text-blue-600" />
                            )}
                          </Popover.Button>
                        );
                      })}
                      <Popover.Button
                        as={Link}
                        to={`/orgs/${currentOrganization.slug}/workflows/new`}
                      >
                        <div className="flex items-center gap-2 mx-1 pl-2.5 py-2 rounded hover:bg-slate-800 transition">
                          <PlusIcon
                            className="h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                          <span className="text-white">New Workflow</span>
                        </div>
                      </Popover.Button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
}
