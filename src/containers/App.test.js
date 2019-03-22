import { mapStateToProps } from './App';
import { SEARCHING, TRENDING } from '../constants';

describe('mapStateToProps', () => {
  describe('when a request is in progress', () => {
    it('disables infinite scroll', () => {
      const state = {
        app: {
          isFetching: true,
        },
      };
      const props = mapStateToProps(state);

      expect(props.enableInfiniteScroll).toBe(false);
    });
  });

  describe('when there are no gifs', () => {
    it('disables infinite scroll', () => {
      const state = {
        app: {
          isFetching: false,
          gifs: [],
        },
      };
      const props = mapStateToProps(state);

      expect(props.enableInfiniteScroll).toBe(false);
    });
  });

  describe('all available gifs have been loaded', () => {
    it('disables infinite scroll', () => {
      const state = {
        app: {
          isFetching: false,
          gifs: [{ id: 'gif' }],
          resultTotal: 1,
        },
      };
      const props = mapStateToProps(state);

      expect(props.enableInfiniteScroll).toBe(false);
    });
  });

  describe('when all requests have finished and there are gifs', () => {
    it('enables infinite scroll', () => {
      const state = {
        app: {
          isFetching: false,
          gifs: [{ id: 'gif' }],
          resultTotal: 2,
        },
      };
      const props = mapStateToProps(state);

      expect(props.enableInfiniteScroll).toBe(true);
    });
  });

  describe('when in trending mode', () => {
    it('marks the app as not searching', () => {
      const state = {
        app: {
          gifs: [],
          mode: TRENDING,
          resultTotal: 0,
        },
      };
      const props = mapStateToProps(state);

      expect(props.searching).toBe(false);
      expect(props.emptySearch).toBe(false);
    });
  });

  describe('when in search mode', () => {
    it('marks the app as searching', () => {
      const state = {
        app: {
          gifs: [],
          mode: SEARCHING,
          resultTotal: 1,
        },
      };
      const props = mapStateToProps(state);

      expect(props.searching).toBe(true);
      expect(props.emptySearch).toBe(false);
    });

    describe('and the gif search has no results', () => {
      it('marks that there is an empty search', () => {
        const state = {
          app: {
            gifs: [],
            mode: SEARCHING,
            resultTotal: 0,
          },
        };
        const props = mapStateToProps(state);

        expect(props.emptySearch).toBe(true);
      });
    });
  });
});
