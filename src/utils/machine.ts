import { createMachine, assign } from 'xstate';

export interface IContext { 
  createRequirement: { [key: string]: string };
  tag: string;
  rejectedReason: string;
  owner: string;
  createdError: string;
  stateStatus: Record<string, boolean>;
}

// type bugMachineEvent =
//   | { type: 'CREATE' }
//   | { type: 'ACCEPT' }
//   | { type: 'DUPLICATE' }
//   | { type: 'REJECT' }
//   | { type: 'NOTABUG' }
//   | { type: 'INPROCESS' }
//   | { type: 'REVIEW' }
//   | { type: 'DONE' }


// type bugMachineState =
//   | { value: 'new', context: IContext }
//   | { value: 'requirementValidation', context: IContext }
//   | { value: 'triage', context: IContext }


const bugMachine = createMachine<IContext>(
  {
    context: {
      createRequirement: {
        version: "",
        reproduce: "",
        expected: "",
      },
      tag: "",
      rejectedReason: "",
      owner: "",
      createdError: "",
      stateStatus: {}
    },
    id: "bug_work_flow",
    initial: "new",
    states: {
      new: {
        entry: 'resetStatus',
        on: {
          CREATE: {
            target: "requirementValidation",
            actions: "createBug",
          },
        },
        exit: 'setStatus'
      },
      requirementValidation: {
        invoke: {
          id: "validate",
          src: "reqValidate",
          onDone: {
            target: "triage",
          },
          onError: {
            target: "new",
            actions: "setError"
          },
        },
      },
      triage: {
        exit: 'triageStatus',
        on: {
          ACCEPT: {
            target: "open",
          },
          REJECT: {
            target: "rejected",
            actions: "rejectBug",
          },
        },
      },
      rejected: {
        exit: 'rejectStatus',
        on: {
          CLOSE: {
            target: "close",
            cond: "rejectValidation",
          },
        },
      },
      open: {
        exit: 'openStatus',
        on: {
          INPROCESS: {
            target: "process",
            actions: "assignWork"
          },
        },
        after: {
          180000: "close",
        },
      },
      process: {
        exit: 'processStatus',
        on: {
          REVIEW: {
            target: "review",
          },
        },
      },
      review: {
        exit: 'reviewStatus',
        on: {
          DONE: {
            target: "close",
          },
        },
      },
      close: {
        entry: 'finalStatus',
        type: "final",
      },
    },
  },
  {
    guards: {
      rejectValidation: (ctx, _) => {
        return ctx.rejectedReason !== "";
      },
    },
    actions: {
      createBug: assign({
        createRequirement: (_, event) => {
          const { version, reproduce, expected } = event;
          return {
              version,
              reproduce,
              expected,
          }
        }
      }),
      rejectBug: assign({
        rejectedReason: (_, event) => {
          const { rejectedReason } = event;
          return rejectedReason
        }
      }),
      assignWork: assign({
        owner: (_, event) => { 
          return event.owner
        }
      }),
      setError: assign({
        createdError: (_, event) => { 
          return event.data.message
        }
      }),
      resetStatus: assign({
        stateStatus: (_context, _event) => { 
          return {}
        }
      }),
      setStatus: assign({
        stateStatus: (_context, _event) => { 
          return {new: true}
        }
      }),
      triageStatus: assign({
        stateStatus: (context, _event) => { 
          const preStatus = context.stateStatus;
          return {...preStatus, triage: true}
        }
      }),
      rejectStatus: assign({
        stateStatus: (context, _event) => { 
          const preStatus = context.stateStatus;
          return {...preStatus, rejected: true}
        }
      }),
      openStatus: assign({
        stateStatus: (context, _event) => { 
          const preStatus = context.stateStatus;
          return {...preStatus, open: true}
        }
      }),
      processStatus: assign({
        stateStatus: (context, _event) => { 
          const preStatus = context.stateStatus;
          return {...preStatus, process: true}
        }
      }),
      reviewStatus: assign({
        stateStatus: (context, _event) => { 
          const preStatus = context.stateStatus;
          return {...preStatus, review: true}
        }
      }),
      finalStatus: assign({
        stateStatus: (context, _event) => { 
          const preStatus = context.stateStatus;
          return {...preStatus, close: true}
        }
      })
    },
    services: {
      reqValidate: async (ctx) => {
        const { createRequirement } = ctx;
        const { version, reproduce, expected } = createRequirement;
        const validateResult = !!version && !!reproduce && !!expected;
        if (!validateResult) {
          throw new Error("missing content");
        } else {
          return "success";
        }
      },
    },
  }
);

export default bugMachine;
