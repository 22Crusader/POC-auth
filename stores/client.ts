import {
    defineStore,
    acceptHMRUpdate
} from 'pinia'

type ClientRole = 'customer' | 'manager' | 'admin'

interface WalletState {
    authorized: boolean
    role: ClientRole
}

export const useClientStore = defineStore('client', {
    state: (): WalletState => ({
        authorized: false,
        role: 'customer'
    }),
    getters: {
        customer (): boolean {
            return !this.authorized || this.role === 'customer'
        },
        manager (): boolean {
            return this.authorized && this.role === 'manager'
        },
        admin (): boolean {
            return this.authorized && this.role === 'admin'
        }
    },
    actions: {
        setAuthorized (value: boolean): void {
            this.authorized = value
        },
        setRole (role: ClientRole): void {
            this.role = role
        }
    }
})

// Hot Module Reloading
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot))
}
