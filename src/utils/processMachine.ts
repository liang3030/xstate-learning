import { assign, createMachine } from 'xstate';


const processWorkflow = createMachine(
  {
    context: {
      bugMachineStates: {
      },
      bugMachineOthers: {}
    },
    id: "set_a_state_machine",
    initial: "init",
    states: {
      init: {
        on: {
          DEFINESTATE: {
            target: "statesReady",
            actions: "addStates",
          },
        },
      },
      statesReady: {
        on: {
          ADDEVENTS: {
            target: "eventsReady",
            actions: 'addEvents',
          },
        }
      },
      eventsReady: {
        on: {
          ADDEFFECTS: {
            target: "effectsActionReady",
            actions: ["addEffectsInStates", "addActionsInOptions"],
          },
        },
      },
      effectsActionReady: {
        on: {
          ADDINVOKE: {
            target: "effectsInvokeReady",
            actions: ["addInvokeInStates", "addInvokeInOptions"],
          },
        },
      },
      effectsInvokeReady: {
        on: {
          ADDGUARD: {
            target: "guardReady",
            actions: ['addGuardInStates', 'addGuardInOptions'],
          },
        },
      },
      guardReady: {
        on: {
          ADDDELAY: {
            target: "delayReady",
            actions: "addDelay",
          },
        },
      },
      delayReady: {
        on: {
          ALLREADY: {
            target: "ready",
          },
        },
      },
      ready: {
        type: "final",
      },
    },
  },
  {
    actions: {
      addStates: assign({
        bugMachineStates: (_context, _event) => { 
          const { bugMachineStates } = _context;
          return {
            ...bugMachineStates,
            id: "bug_work_flow",
            initial: "new",
            context: {
              createRequirement: {
                version: "",
                reproduce: "",
                expected: "",
              },
              tag: "",
              rejectedReason: "",
              owner: "",
            },
            states: {
              new: {},
              triage: {},
              rejected: {},
              open: {},
              process: {},
              review: {},
              close: {
                type: "final",
              },
            },
          }
        }
      }),
      addEvents: assign({
        bugMachineStates: (_context, _event) => { 
          const { bugMachineStates } = _context;
          return {
            ...bugMachineStates,
            states: {
              new: {
                on: {
                  CREATE: {
                    target: 'triage',
                  }
                }
              },
              triage: {
                on: {
                  ACCEPT: {
                    target: 'open',
                  },
                  REJECT: {
                    target: 'rejected'
                  }
                }
              },
              rejected: {
                on: {
                  CLOSE: {
                    target: 'close'
                  }
                }
              },
              open: {
                on: {
                  PROCESS: {
                    target: 'process'
                  }
                }
              },
              process: {
                on: {
                  REVIEW: {
                    target: 'review'
                  }
                }
              },
              review: {
                on: {
                  DONE: {
                    target: 'close'
                  }
                }
              },
              close: {
                type: "final",
              },
            },
          }
        }
      }), 
      addEffectsInStates:assign({
        bugMachineStates: (_context, _event) => { 
          const { bugMachineStates } = _context;
          return {
            ...bugMachineStates,
            states: {
              new: {
                on: {
                  CREATE: {
                    target: 'triage',
                    acctions: "createBug"
                  }
                }
              },
              triage: {
                on: {
                  ACCEPT: {
                    target: 'open',
                  },
                  REJECT: {
                    target: 'rejected',
                    actions: "rejectBug",
                  }
                }
              },
              rejected: {
                on: {
                  CLOSE: {
                    target: 'close'
                  }
                }
              },
              open: {
                on: {
                  PROCESS: {
                    target: 'process',
                    actions: "assignWork"
                  }
                }
              },
              process: {
                on: {
                  REVIEW: {
                    target: 'review'
                  }
                }
              },
              review: {
                on: {
                  DONE: {
                    target: 'close'
                  }
                }
              },
              close: {
                type: "final",
              },
            },
          }
        }
      }),
      addActionsInOptions:assign({
        bugMachineOthers: (_context, _event) => { 
          const { bugMachineOthers } = _context;
          return {
            ...bugMachineOthers,
            actions: {
              createBug: `assign({
                createRequirement: (_, event) => {
                  const { version, reproduce, expected } = event;
                  return {
                      version,
                      reproduce,
                      expected,
                  }
                }
              })`,
              rejectBug: `assign({
                rejectedReason: (_, event) => {
                  const { rejectedReason } = event;
                  return rejectedReason
                }
              })`,
              assignWork: `assign({
                owner: (_, event) => { 
                  return event.owner
                }
              })`
            },
          }
        }
      }),
      addInvokeInStates:assign({
        bugMachineStates: (_context, _event) => { 
          const { bugMachineStates } = _context;
          return {
            ...bugMachineStates,
            states: {
              new: {
                on: {
                  CREATE: {
                    target: 'triage',
                    acctions: "requirementValidation"
                  }
                }
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
                on: {
                  ACCEPT: {
                    target: 'open',
                  },
                  REJECT: {
                    target: 'rejected',
                    actions: "rejectBug",
                  }
                }
              },
              rejected: {
                on: {
                  CLOSE: {
                    target: 'close'
                  }
                }
              },
              open: {
                on: {
                  PROCESS: {
                    target: 'process',
                    actions: "assignWork"
                  }
                }
              },
              process: {
                on: {
                  REVIEW: {
                    target: 'review'
                  }
                }
              },
              review: {
                on: {
                  DONE: {
                    target: 'close'
                  }
                }
              },
              close: {
                type: "final",
              },
            },
          }
        }
      }),
      addInvokeInOptions:assign({
        bugMachineOthers: (_context, _event) => { 
          const { bugMachineOthers } = _context;
          // @ts-ignore
          const { actions } = bugMachineOthers;
          return {
            ...bugMachineOthers,
            actions: {
              ...actions,
              setError: `assign({
                createdError: (_, event) => { 
                  return event.data.message
                }
              })`
            },
            services: {
              reqValidate: `async (context) => {
                const { createRequirement } = context;
                const { version, reproduce, expected } = createRequirement;
                const validateResult = !!version && !!reproduce && !!expected;
                if (!validateResult) {
                  throw new Error("missing content");
                } else {
                  return "success";
                }
              }`,
            },
          }
        }
      }),
      addGuardInStates:assign({
        bugMachineStates: (_context, _event) => { 
          const { bugMachineStates } = _context;
          // @ts-ignore
          const { states } = bugMachineStates
          return {
            ...bugMachineStates,
            states: {
              ...states,
              rejected: {
                on: {
                  CLOSE: {
                    target: 'close',
                    cond: "rejectValidation",
                  }
                }
              },
            },
          }
        }
      }),
      addGuardInOptions:assign({
        bugMachineOthers: (_context, _event) => { 
          const { bugMachineOthers } = _context
          return {
            ...bugMachineOthers,
            guards: {
              rejectValidation: `(context, _event) => {
                return context.rejectedReason !== "";
              }`,
            },
          }
        }
      }),
      addDelay: assign({
        bugMachineStates: (_context, _event) => { 
          const { bugMachineStates } = _context;
          // @ts-ignore
          const { states } = bugMachineStates
          return {
            ...bugMachineStates,
            states: {
              ...states,
              open: {
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
            },
          }
        }
      })
    },
  }
);

export default processWorkflow;
