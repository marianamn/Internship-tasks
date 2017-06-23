import React, { Component } from 'react';

import { getRepos } from '../services/githubIssues.service';
import { getIssues } from '../services/githubIssues.service';
import { getWatchers } from '../services/githubIssues.service';
import { getTotalIssues } from '../services/githubIssues.service';
import findItemByName from '../services/find-item-by-name.service';

import Selector from '../components/selector/Selector';
import IssuesList from '../components/issues-list/IssuesList';
import Statistic from '../components/statistic/Statistic';
import Filter from '../components/filter/Filter';
import Sort from '../components/sort/Sort';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      issues: [],
    };

    this.selectedFilter = '';
    this.sortValue = '';
    this.selectedRepoName = '';
    this.selectedRepo = {};
    this.page = 1;
    this.isDisabled = false;

    this.handleChange = this.handleChange.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
    this.sortIssues = this.sortIssues.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);

    getRepos()
      .then(resultedRepos => {
        this.setState({ repos: resultedRepos });
        this.selectedRepoName = resultedRepos[0].full_name;

        this.selectedRepo = resultedRepos[0];

        this.getWatchersAndIssuesStatistic(this.selectedRepoName);

        this.getIssues();
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

  handleChange(e) {
    this.selectedRepoName = e.target.value;

    var repo = findItemByName(this.selectedRepoName, this.state.repos);
    this.selectedRepo = repo;

    this.getWatchersAndIssuesStatistic(this.selectedRepoName);

    this.page = 1;
    this.setState({ issues: [] });
    this.selectedFilter = '';
    this.selectedSort = '';

    this.getIssues();
  }

  getIssues() {
    this.isDisabled = true;

    var params = {
      name: this.selectedRepoName,
      page: this.page,
      filterBy: this.selectedFilter || '',
      sortValue: this.selectedSort || ''
    }

    return getIssues(params)
      .then((receivedIssues) => {
        this.setState((prevState) => ({
          issues: prevState.issues.concat(receivedIssues)
        }))
        this.isDisabled = false;
      });
  }

  getWatchersAndIssuesStatistic(repoName) {
    let repo = this.selectedRepo;

    let getTotalReposPromise = getWatchers(repoName);
    let getWatchersPromise = getTotalIssues(repoName);

    Promise.all([getTotalReposPromise, getWatchersPromise])
      .then(([watchers, repository]) => {
        repo.watch = watchers.subscribers_count;
        repo.totalIssues = repository.total_count;
        repo.closed = repo.totalIssues - repo.open_issues;
      });
  }

  scroll() {
    var buffer = 100;
    var vpHeight = document.body.offsetHeight - window.innerHeight;

    if (!this.isDisabled && (vpHeight - buffer) <= document.body.scrollTop) {
      this.loadMoreIssues();
    }
  }

  loadMoreIssues() {
    this.page++;

    this.getIssues();
  }

  filterIssues(e) {
    this.selectedFilter = e.target.value;

    this.page = 1;

    this.setState((prevState) => ({
      issues: prevState.issues = []
    }))

    this.getIssues();
  }

  sortIssues(e) {
    this.selectedSort = e.target.value;

    this.page = 1;

    this.setState((prevState) => ({
      issues: prevState.issues = []
    }))

    this.getIssues();
  }

  render() {
    return (
      <div>
        Top 5 JavaScript Repos:
                <Selector value={this.selectedRepoName}
          onChange={this.handleChange}
          repos={this.state.repos}></Selector>

        <Statistic repo={this.selectedRepo}></Statistic>

        <div>
          <Filter onChange={this.filterIssues}></Filter>
          <Sort onChange={this.sortIssues}></Sort>
        </div>

        <IssuesList issues={this.state.issues} ></IssuesList>
      </div>
    );
  }
}

export default App;
