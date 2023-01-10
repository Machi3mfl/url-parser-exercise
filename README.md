# URL Parser Exercise

We need some logic that extracts the variable parts of a url into a hash. The keys of the
extract hash will be the "names" of the variable parts of a url, and the values of the hash
will be the values. We will be supplied with:

1. A url format string, which describes the format of a url. A url format string can
contain constant parts and variable parts, in any order, where "parts" of a url are
separated with "/". All variable parts begin with a colon. Here is an example of
such a url format string:

```
'/:version/api/:collection/:id'
```

2. A particular url instance that is guaranteed to have the format given by the url
format string. It may also contain url parameters. For example, given the example
url format string above, the url instance might be:
'/6/api/listings/3?sort=desc&limit=10'
Given this example url format string and url instance, the hash we want that maps all
the variable parts of the url instance to their values would look like this:

```json
{
version: 6,
collection: 'listings',
id: 3,
sort: 'desc',
limit: 10
}
```

## Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Full documentation](#full-documentation)


## Introduction

Hystrix is a latency and fault tolerance library designed to isolate points of access to remote systems, services and 3rd party libraries, stop cascading failure and enable resilience in complex distributed systems where failure is inevitable.

## Installation

Installing the current exercise using npm package

```
npm install
```

## Usage

The current exercise only have unit test script, you can run it using the following command:

```
npm run test:coverage
```

## Full Documentation

See the [Wiki](https://github.com/Machi3mfl/url-parser-exercise/wiki/) for full documentation, examples, operational details and other information.
