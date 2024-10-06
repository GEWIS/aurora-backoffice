import { type AuditLogEntryResponse, getAuditLogs } from '@/api';
import { defineStore } from 'pinia';
import { handleError } from '@/utils/errorHandler';
import { useSocketStore } from '@/stores/socket.store';

interface AuditStore {
  dashboardEntries: AuditLogEntryResponse[];
  entries: AuditLogEntryResponse[];
  take: number;
  skip: number;
  count: number;
  loading: boolean;
}

export const useAuditStore = defineStore('audit', {
  state: (): AuditStore => ({
    dashboardEntries: [],
    entries: [],
    take: 5,
    skip: 0,
    count: 0,
    loading: true
  }),
  getters: {},
  actions: {
    async handleAuditLogAddition(log: AuditLogEntryResponse) {
      this.dashboardEntries = [log, ...this.dashboardEntries].slice(0, 15);
    },
    async init() {
      await getAuditLogs({
        query: {
          take: this.take,
          skip: this.skip
        }
      })
        .then((logs) => {
          this.dashboardEntries = logs.data!.records;
          this.count = logs.data!.pagination.count;
        })
        .catch(handleError);

      this.loading = false;

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('audit_log_create', this.handleAuditLogAddition);
    },
    async getLogs() {
      this.loading = true;
      await getAuditLogs({
        query: {
          take: this.take,
          skip: this.skip
        }
      })
        .then((logs) => {
          this.entries = logs.data!.records;
          this.count = logs.data!.pagination.count;
        })
        .catch(handleError);
      this.loading = false;
    },
    async setSkip(skip: number) {
      this.skip = skip;
      await this.getLogs();
    },
    async setTake(take: number) {
      this.take = take;
      await this.getLogs();
    },
    async destroy() {
      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.removeListener('audit_log_create', this.handleAuditLogAddition);
    }
  }
});
