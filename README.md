# js-archive-creator
# Usage

```
git clone ...
```

# Application

* leetcode
* SICP
* algorithm & data struct

# API

* add(name, type)
* rename(oldName, name)
* delete(name)
* edit(name, title, desc, code, summary)

# Data Struct

> fileSys

| Key | type | default |
| --- | --- | --- |
| name | String | new folder |
| type | String(folder / file) | folder |
| children | Array | [] |

> fileStats

| Key | Type | Default |
| --- | --- | --- |
| name | String | new folder |
| title | String | new title |
| desc | String | new desc |
| code | String | code |
| summary | String | sumamry |

