import { defineStore } from 'pinia';

interface Subscriber {
    name: string,
    id: string
    active: boolean,
    lastSeen: Date,
}

interface SubscriberStore {
    subscribers: Subscriber[],
    selected?: Subscriber,
}

export const useSubscriberStore = defineStore('subscriber', {
    state: () => ({
        subscribers: [] as Subscriber[],
        selected: undefined,
    }) as SubscriberStore,
    getters: {

    },
    actions: {
        async setSelected(id: string) {
            this.selected = this.subscribers.find((s) => s.id === id);
        },
        async fetchSubscribers() {
            this.subscribers = [
                {
                    name: "PCGEWISB",
                    id: "358162f8-7038-11ee-9e67-c7a5748223c9",
                    active: true,
                    lastSeen: new Date(),
                },
                {
                    name: "PCGEWISC",
                    id: "44c2c072-7038-11ee-84f8-fb8026ef535e",
                    active: true,
                    lastSeen: new Date(),
                },
                {
                   name: "PCGEWISA",
                   id: "540ccd52-7047-11ee-8bb2-9f053a1e1516",
                   active: false,
                   lastSeen: new Date("2023-10-20T15:35:58.000Z"),
                }
            ]
        }
    },
});
