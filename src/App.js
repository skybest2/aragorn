import logo from './assets/logo.svg'
import { WalletConnect } from './components/WalletConnect/index.js'
import './styles/main.css'
import { Main, Card, Split, Box, DataView, IdentityBadge } from '@aragon/ui'

//Connect to Blockchain
import { Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { defaultChains } from 'wagmi'

import { TokenAmount } from '@aragon/ui'

function App() {
  //Blockchain Connection
  const chains = defaultChains
  // Set up connectors
  const connectors = ({ chainId }) => {
    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
    ]
  }

  return (
    <div className="App">
      <Provider autoConnect connectors={connectors}>
        <Main scrollView={false} layout={false}>
          <navbar className="navbar-container">
            <div className="logo-container">
              <img src={logo} className="app-logo" alt="logo" />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-beetween',
                gap: '10px',
                alignItems: 'center',
                marginRight: '20%',
              }}
            >
              <TokenAmount
                address="0x6B175474E89094C44Da98b954EedeAC495271d0F"
                amount="1"
                decimals={18}
                symbol="DAI"
              />
              <TokenAmount
                address="0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
                amount="1"
                decimals={18}
                symbol="BNB"
              />
            </div>
            <div className="button">
              <WalletConnect />
            </div>
          </navbar>

          <section>
            <Split
              primary={
                <Box>
                  <Card>Card content</Card>
                </Box>
              }
              secondary={
                <Box heading="Secondary">
                  <DataView
                    fields={['Account']}
                    entries={[
                      { account: '0x0...' },
                      { account: '0x0...' },
                      { account: '0x0...' },
                    ]}
                    renderEntry={({ account }) => {
                      return [<IdentityBadge entity={account} />]
                    }}
                  />
                </Box>
              }
            />
          </section>
        </Main>
      </Provider>
    </div>
  )
}

export default App
