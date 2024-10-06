import {
  disableTimeTrailRacing,
  enableTimeTrailRace,
  getRaceState,
  type PlayerParams,
  raceFinish,
  type RaceFinishedEvent,
  type RacePlayerReadyEvent,
  type RacePlayerRegisteredEvent,
  raceReady,
  raceRegisterPlayer,
  raceResetPlayer,
  raceRevealScore,
  type RaceScoreboardEvent,
  raceStart,
  type RaceStartedEvent,
  type RegisterPlayerParams,
  type ScoreboardItem,
  type TimeTrailRaceState
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
        const res = await getRaceState();
        this.state = res.data!.state;
        this.sessionName = res.data!.sessionName;
        this.scoreboard = res.data!.scoreboard;
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

      await enableTimeTrailRace({
        body: {
          lightsGroupIds: lightsGroupIds,
          screenIds: screenIds,
          audioIds: audioIds,
          sessionName: sessionName
        }
      })
        .then(() => {
          this.sessionName = sessionName;
          this.state = 'INITIALIZED' as TimeTrailRaceState;
        })
        .catch(handleError);

      this.loading = false;
    },
    async registerPlayer(params: RegisterPlayerParams) {
      this.loading = true;
      await raceRegisterPlayer({
        body: params
      })
        .then((player) => this.handleRegisterPlayer(player.data!))
        .catch(handleError);
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
      await raceReady()
        .then((ready) => this.handleReady(ready.data!))
        .catch(handleError);
      this.loading = false;
    },
    handleReady(event: RacePlayerReadyEvent) {
      this.currentPlayer = event.player;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
    },
    async start() {
      this.loading = true;
      await raceStart()
        .then((start) => this.handleStart(start.data!))
        .catch(handleError);
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
      await raceFinish()
        .then((finish) => this.handleFinish(finish.data!))
        .catch(handleError);
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
      await raceRevealScore()
        .then((score) => this.handleRevealScore(score.data!))
        .catch(handleError);
      this.loading = false;
    },
    handleRevealScore(event: RaceScoreboardEvent) {
      this.currentPlayer = event.player;
      this.state = event.state as any as TimeTrailRaceState;
      this.sessionName = event.sessionName;
      this.scoreboard = event.scoreboard;
      this.startTime = undefined;
    },
    async resetPlayer() {
      this.loading = true;
      await raceResetPlayer()
        .then((reset) => this.handleRevealScore(reset.data!))
        .catch(handleError);
      this.loading = false;
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
      await disableTimeTrailRacing();
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
