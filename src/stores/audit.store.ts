import { defineStore } from 'pinia';
import { noop } from 'lodash';
import { type AuditLogEntryResponse, getAuditLogs } from '@/api';
import { useSocketStore } from '@/stores/socket.store';

/**
 * Audit store
 * @param dashboardEntries - The log entries shown on the dashboard
 * @param entries - The log entries
 * @param take - The number of entries to show
 * @param skip - The number of entries to skip
 * @param count - The total number of pages needed to show all entries
 * @param loading - The loading state
 */
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
    /**
     * Handle the audit log addition
     * @param log
     */
    async handleAuditLogAddition(log: AuditLogEntryResponse) {
      this.dashboardEntries = [log, ...this.dashboardEntries].slice(0, this.take);
    },
    /**
     * Initialize the store
     */
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
        .catch(noop);

      this.loading = false;
      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('audit_log_create', this.handleAuditLogAddition);
    },
    /**
     * Get the audit logs
     */
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
        .catch(noop);
      this.loading = false;
    },
    /**
     * Set the skip value
     * @param skip
     */
    async setSkip(skip: number) {
      this.skip = skip;
      await this.getLogs();
    },
    /**
     * Set the take value
     * @param take
     */
    async setTake(take: number) {
      this.take = take;
      await this.getLogs();
    },
    /**
     * Destroy the store
     */
    async destroy() {
      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.removeListener('audit_log_create', this.handleAuditLogAddition);
    }
  }
});
