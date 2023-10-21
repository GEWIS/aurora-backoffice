import { defineStore } from 'pinia';

interface Subscriber {
    name: string,
    id: string
}

export const useSubscriberStore = defineStore('subscriber', {
    state: () => ({
        subscribers: [] as Subscriber[],
    }),
    getters: {

    },
    actions: {
        async fetchSubscribers() {
        // TODO ACTUAL CALL
            this.subscribers = [
                {
                    name: "PCGEWISB",
                    id: "358162f8-7038-11ee-9e67-c7a5748223c9",
                },
                {
                    name: "PCGEWISC",
                    id: "44c2c072-7038-11ee-84f8-fb8026ef535e",
                }
            ]
        }
    },
});