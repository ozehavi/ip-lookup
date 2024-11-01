import IpLookup from "./components/IpLookup";

function App() {  
    return (
        <IpLookup />  
    )
}

export default App;


// // src/state/types.ts
// export interface State {
//     hostInfo: HostInfo | null;
//     lookupHistory: LookupState;
//     ui: UIState;
//   }
  
//   export interface LookupState {
//     items: Lookup[];
//     isLoading: boolean;
//     error: string | null;
//     filters: FilterCriteria;
//   }
  
//   // src/state/reducer.ts
//   import { produce } from 'immer';  // Shows knowledge of immutability helpers
  
//   export const reducer = produce((draft, action: Action) => {
//     switch (action.type) {
//       case 'SET_HOST_INFO':
//         draft.hostInfo = action.payload;
//         break;
//       case 'ADD_LOOKUP':
//         draft.lookupHistory.items.push(action.payload);
//         break;
//       case 'SET_ERROR':
//         draft.lookupHistory.error = action.payload;
//         break;
//       // Shows extensibility
//       case 'FILTER_LOOKUPS':
//         draft.lookupHistory.filters = action.payload;
//         break;
//     }
//   });
  
//   // src/hooks/useApi.ts
//   export const useApi = (dispatch: Dispatch<Action>) => {
//     const lookupDomain = async (domain: string) => {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       try {
//         const data = await api.lookup(domain);
//         dispatch({ type: 'ADD_LOOKUP', payload: data });
//         return data;
//       } catch (error) {
//         dispatch({ type: 'SET_ERROR', payload: error.message });
//       } finally {
//         dispatch({ type: 'SET_LOADING', payload: false });
//       }
//     };
    
//     return { lookupDomain };
//   };
  
//   // src/App.tsx
//   const App = () => {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     const api = useApi(dispatch);
  
//     // Shows understanding of performance optimization
//     const filteredHistory = useMemo(() => 
//       filterLookups(state.lookupHistory.items, state.lookupHistory.filters),
//       [state.lookupHistory.items, state.lookupHistory.filters]
//     );
  
//     return (
//       <AppContext.Provider value={{ state, dispatch }}>
//         <Layout>
//           <HostInfo data={state.hostInfo} />
//           <LookupForm onSubmit={api.lookupDomain} />
//           <LookupHistory 
//             data={filteredHistory}
//             isLoading={state.lookupHistory.isLoading}
//             error={state.lookupHistory.error}
//           />
//         </Layout>
//       </AppContext.Provider>
//     );
//   };