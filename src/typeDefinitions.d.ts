//  ================
//  TYPE DEFINITIONS
//  ================

import type { Octokit } from '@octokit/core'
import type { PaginateInterface } from '@octokit/plugin-paginate-rest'
import type { RestEndpointMethods } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types'

export type octokit = { [x: string]: any } & { [x: string]: any } & Octokit & RestEndpointMethods & { paginate: PaginateInterface }
export type github = typeof import('@actions/github')
export type core = typeof import('@actions/core')