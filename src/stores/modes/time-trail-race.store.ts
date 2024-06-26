import {
  ApiError,
  ModesService,
  type PlayerParams,
  type RaceFinishedEvent,
  type RacePlayerReadyEvent,
  type RacePlayerRegisteredEvent,
  type RaceScoreboardEvent,
  type RaceStartedEvent,
  type RegisterPlayerParams,
  type ScoreboardItem,
  TimeTrailRaceState
} from '@/api';
import { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/socket.store';
import { handleError } from '@/utils/errorHandler';

interface TimeTrailRaceStore {
  sessionName?: string;
  state?: TimeTrailRaceState;
  scoreboard: ScoreboardItem[];
  currentPlayer?: PlayerParams | ScoreboardItem;
  loading: boolean;
  startTime?: Date;
}

export const useTimeTrailRaceStore = defineStore('time-trail-race', {
  state: (): TimeTrailRaceStore => ({
    scoreboard: [],
    loading: true
  }),
  getters: {
    enabled(): boolean {
      return this.sessionName != null && this.state != null && !this.loading;
    },
    disabled(): boolean {
      return (this.sessionName == null || this.state == null) && !this.loading;
    }
  },
  actions: {
    async getTimeTrailMode() {
      this.loading = true;
      try {
        const { state, sessionName, scoreboard } = await ModesService.getRaceState();
        this.state = state;
        this.sessionName = sessionName;
        this.scoreboard = scoreboard;
      } catch (e) {
        this.state = undefined;
        this.sessionName = undefined;
        this.scoreboard = [];
      }
      this.loading = false;
    },
    async initializeTimeTrailMode(
      sessionName: string,
      audioIds: number[],
      screenIds: number[],
      lightsGroupIds: number[]
    ) {
      this.loading = true;

      await ModesService.enableTimeTrailRace({
        sessionName,
        audioIds,
        screenIds,
        lightsGroupIds
      })
        .then(() => {
          this.sessionName = sessionName;
          this.state = TimeTrailRaceState.INITIALIZED;
        })
        .catch(handleError);

      this.loading = false;
    },
    async registerPlayer(params: RegisterPlayerParams) {
      this.loading = true;
      await ModesService.raceRegisterPlayer(params)
        .then(this.handleRegisterPlayer)
        .catch((e: ApiError) => {
          handleError({
            name: e.statusText,
            message: e.message,
            statusCode: e.status
          });
        });
      this.loading = false;
    },
    handleRegisterPlayer(event: RacePlayerRegisteredEvent) {
      this.currentPlayer = event.player;
      this.scoreboard = event.scoreboard;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
    },
    async ready() {
      this.loading = true;
      await ModesService.raceReady()
        .then(this.handleReady)
        .catch((e: ApiError) => {
          handleError({
            name: e.statusText,
            message: e.message,
            statusCode: e.status
          });
        });
      this.loading = false;
    },
    handleReady(event: RacePlayerReadyEvent) {
      this.currentPlayer = event.player;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
    },
    async start() {
      this.loading = true;
      await ModesService.raceStart()
        .then(this.handleStart)
        .catch((e: ApiError) => {
          handleError({
            name: e.statusText,
            message: e.message,
            statusCode: e.status
          });
        });
      this.loading = false;
    },
    handleStart(event: RaceStartedEvent) {
      this.currentPlayer = event.player;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
      this.startTime = new Date(event.startTime);
    },
    async finish() {
      this.loading = true;
      await ModesService.raceFinish()
        .then(this.handleFinish)
        .catch((e: ApiError) => {
          handleError({
            name: e.statusText,
            message: e.message,
            statusCode: e.status
          });
        });
      this.loading = false;
    },
    handleFinish(event: RaceFinishedEvent) {
      this.currentPlayer = event.player;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
      this.scoreboard = event.scoreboard;
    },
    async revealScore() {
      this.loading = true;
      await ModesService.raceRevealScore()
        .then(this.handleRevealScore)
        .catch((e: ApiError) => {
          handleError({
            name: e.statusText,
            message: e.message,
            statusCode: e.status
          });
        });
      this.loading = false;
    },
    handleRevealScore(event: RaceScoreboardEvent) {
      this.currentPlayer = event.player;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
      this.scoreboard = event.scoreboard;
      this.startTime = undefined;
    },
    async init() {
      await this.getTimeTrailMode();

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on(
        'race-player-registered',
        this.handleRegisterPlayer.bind(this)
      );
      socketStore.backofficeSocket?.on('race-player-ready', this.handleReady.bind(this));
      socketStore.backofficeSocket?.on('race-player-start', this.handleStart.bind(this));
      socketStore.backofficeSocket?.on('race-player-finish', this.handleFinish.bind(this));
      socketStore.backofficeSocket?.on('race-scoreboard', this.handleRevealScore.bind(this));
    },
    async quit() {
      this.loading = true;
      await ModesService.disableTimeTrailRacing();
      this.state = undefined;
      this.sessionName = undefined;
      this.scoreboard = [];
      this.loading = false;
    },
    destroy() {
      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.removeListener(
        'race-player-registered',
        this.handleRegisterPlayer.bind(this)
      );
      socketStore.backofficeSocket?.removeListener(
        'race-player-ready',
        this.handleReady.bind(this)
      );
      socketStore.backofficeSocket?.removeListener(
        'race-player-start',
        this.handleStart.bind(this)
      );
      socketStore.backofficeSocket?.removeListener(
        'race-player-finish',
        this.handleFinish.bind(this)
      );
      socketStore.backofficeSocket?.removeListener(
        'race-scoreboard',
        this.handleRevealScore.bind(this)
      );
    }
  }
});
