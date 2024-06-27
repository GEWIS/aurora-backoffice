import { type AuditLogEntryResponse, AuditLogsService } from '@/api';
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
    take: 20,
    skip: 0,
    count: 0,
    loading: true
  }),
  getters: {},
  actions: {
    async handleAuditLogAddition() {},
    async init() {
      await AuditLogsService.getAuditLogs(undefined, undefined, undefined, 15)
        .then((r) => {
          this.dashboardEntries = r.records;
          this.count = r.pagination.count;
        })
        .catch(handleError);
      this.loading = false;

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('audit_log_create', (r) => console.log(r));
    },
    async getLogs() {
      this.loading = true;
      await AuditLogsService.getAuditLogs(undefined, undefined, undefined, this.take, this.skip)
        .then((r) => {
          this.entries = r.records;
          this.count = r.pagination.count;
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
    async destroy() {}
  }
});
