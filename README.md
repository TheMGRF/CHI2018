# CHI2018
Year 3 Web Application Integration Assignment

### Accessing
 - The work is available in a "live" state [here](http://unn-w18013094.newnumyspace.co.uk/chi2018/part2).
 - API Documentation: [here](http://unn-w18013094.newnumyspace.co.uk/chi2018/part1)
 - API: [here](http://unn-w18013094.newnumyspace.co.uk/chi2018/part1/api)
 - For local use run `npm start`
 - To deploy use `npm run build` and upload the contents of `build/`
 - GitHub: [https://github.com/TheMGRF/CHI2018](https://github.com/TheMGRF/CHI2018)

### Error Logging
Error handling in the project defaults to outputting the errors
to the SQLite database but also supports logging them to a file
by specifying `false` on the error function.
```php
function logError($msg, $database)
```

### Documentation
The API endpoint listing in the documentation page and the API
are automatically generated from PHP code using the classes
`APIEndpoing.class.php`and `APIEndpoints.class.php` where the
endpoint objects are stored and added to an array so that they
can be called at any time via `/api/endpoints`.

### API Endpoints
All API endpoints are handled in `JsonWebPage.class.php` class.
There are 15 in total to accommodate client needs in a variety
of situations.
Nearly every endpoint supports an optional `?limit=X`parameter
and options to filter by IDs and days etc.
*Only the update endpoint requires authentication.*

### Author Information
Upon searching for authors and seeking further information on them
this information is displayed in a pop-up modal when clicking on
their name. This helps condense the information and can be dismissed
by clicking anywhere on the application.

### Finishing Student Notes
#### SQLite
SQLite is a disaster. It didn't support several features that I would
have liked to use in this assignment and went out of its way to be
awkward in re-adding simple features like replacing `CONCAT` with its
own weird version. Everyone on this course has worked with SQL in some
format at some point, they've also worked with phpmyadmin, so I find it
incredibly hard to understand why we would be hemorrhaged by an inferior
piece of software. On that note, DB Browser is horrendous at managing data updates.

#### Random Limits
Using SQLite as a basis these random limits that are applied to us make
little sense in the grand scheme of things. University consistently says
it wants to prepare people for industry but Angular v1.x and PHP 5??
These have been deprecated for years... Encouraging their use in any form is
ludicrous but then using PHP 5.6 is even more insane. It quite literally hit
[EOL](https://en.wikipedia.org/wiki/PHP#cite_ref-supportedversions_100-1) in 2018...
This leaves massive security flaws in any system using it and has left me
rewriting a lot of code as PHPStorm defaulted to PHP 7 (rightly so) without
me even realising it and subsequently resulted in me [removing](https://github.com/TheMGRF/CHI2018/commit/91ea7dd6956e810a9805303b67b15c09f36a8239)
a lot of code and even comments...
<br>Also ini files? Really? I think you just gave most sysadmins a heart attack.

#### PHP And React...
What a bizarre and unconventional "solution"... And I don't mean that as
a compliment. These two languages/frameworks are not really designed to go together like this.
React will accept any input from JSON sure but using PHP for this feels like
abuse of its capabilities. The role of something acting as this pure API is
something that should be delegated to Node or Java not a server-side rendering language
like PHP. It is designed to avoid things like React, it has its own capabilities to
render information and even frameworks like [Laravel](https://laravel.com/) exist to assist this.

On that note: **dependencies**
<br>They exist. Use them. You do not copy and paste the 5 files you need from a project.
The repo even explicitly states the install command `composer require firebase/php-jwt`.
Encouraging this king of slap dash copy and pasting of code is a literally a disaster
waiting to happen. Teaching this kind of behaviour to people who are supposedly supposed  
to go into industry with this kind of understanding is what terrifies most other programmers
who are going to have to clean up messes like this.
If that repo gets updated, you've got to re-copy it, updated your namespaces,
fix case sensitivity yourself and god forbid any refactors that will completely break your internals.
Not to mention that no tests were copied over so theres now zero validation for the copied code.
<br>Literally every student on this course violated the [BSD3 licencing](https://github.com/firebase/php-jwt/blob/master/LICENSE)
of the JWT project and left out the copyright claims of Neuman Vong. 

I guess it works? But just because it works doesn't mean it should be done this way.

#### Lectures
I don't even know what to say here... I mean, I gather it worked out? But 5-15 minute
lectures, delivered online, week at a time? Really? Okay. I guess that's what £9,250 gets you.

#### Finally
I felt the work required for this assignment was completely disproportionate to
the time given for it. Especially considering we have all worked over the
holiday/Christmas period to get this done whilst there is a global pandemic raging
about. I heard things had been changed to "accommodate" covid but have seen no
examples of that for this module. I feel a project of this scope was clearly designed
with year long work in mind.

*My thoughts and comments represented in this file are personal to myself as someone
who has been programming for many years and finds these kinds of limitations frustrating.
There is no hate or ill intent directed at any individual associated with this
module, but rather an attempt to improve it for future students who would better benefit
from work representative of the real world.*