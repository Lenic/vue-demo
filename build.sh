#!/bin/bash
set -e

# --------------------------------------------------------------------------------------------
# 必须的环境变量：
#   - buildType：构建方式，只有 dev 和 prod 两个可选项
# 可选的环境变量：
#   - commitid：Git 提交 ID
#   - branchName：分支的名称，支持 feature/add-new-module 这种格式，会将 / 符号转化为 - 符号
# 可选的命令行参数：
#   - suffix：需要添加的名称，需要符合 URI 规则
# --------------------------------------------------------------------------------------------

# variables
cwd=`pwd`
buildCommand="npx webpack --hide-modules --config ./config/webpack.config.$buildType.js"
packageInfo=`cat package.json | grep -E 'name|version'`
name=`echo "$packageInfo" | grep name | awk -F ': ' '{print $2}' | awk -F '"' '{print $2}'`
filename=$name
version=`echo "$packageInfo" | grep version | awk -F ': ' '{print $2}' | awk -F '"' '{print $2}'`
filenameArray=($version)

# branch name processer
for item in `echo $branchName | awk -F / 'BEGIN{RS=""}{for(a=1;a<=NF;a++) print $a}'`
do
  filenameArray[${#filenameArray[@]}]=$item
done

# console arguments
for arg in "$@"
do
  item=`echo $arg | grep '^--suffix='`
  if [[ $item != '' ]]
  then
    filenameArray[${#filenameArray[@]}]=`echo $arg | awk -F = '{print $2}'`
  fi
done

# commitid
if [ $commitid ];then
	filenameArray[${#filenameArray[@]}]=${commitid:0:8}
fi

# filename
for item in ${filenameArray[@]};
do
	filename=${filename}'-'${item}
done
filename=${filename}'.tar.gz'

# clear previous files
echo -e "\ncd $cwd"
cd $cwd

echo -e "\nrm -rf dist/"
rm -rf dist/

# build packagee
echo -e "\n$buildCommand"
$buildCommand

# compress files
echo -e "\ncd dist/"
cd dist/

echo -e "\ntar cvzf $filename ./*"
tar cvzf $filename ./*

echo -e "\ncd $cwd"
cd $cwd

# upload compressed's file
uploadUrl="http://store.helianshare.com/repository/nas/${name}/${filename}"

echo -e "\ncd $cwd"
cd $cwd

uploadCommand="curl -X PUT -u admin:admin123 $uploadUrl --upload-file dist/$filename"
echo -e "\n${uploadCommand}"
$uploadCommand

# notification
urlencode() {
  # urlencode <string>
  old_lc_collate=$LC_COLLATE
  LC_COLLATE=C

  local length="${#1}"
  for (( i = 0; i < length; i++ )); do
    local c="${1:i:1}"
    case $c in
      [a-zA-Z0-9.~_-]) printf "$c" ;;
      *) printf '%%%02X' "'$c" ;;
    esac
  done

  LC_COLLATE=$old_lc_collate
}

uploadUrl='http://store.helianshare.com/repository/nas/test-vuex/test-vuex-1.0.0.tar.gz'
encodedUrl=`urlencode $uploadUrl`
currentDate=`date '+%Y-%m-%d %H:%M:%S'`

generate_post_data() {
cat <<EOF
{
  "msgtype": "markdown",
  "markdown": {
    "title":"打包结果：${name}",
    "text":"### 自动打包成功  \n下载地址：[点我下载](${uploadUrl})  \n项目名称：${name}  \n版本信息：${version}  \n所属分支：${branchName}  \n提交号码：${commitid}  \n打包时间：${currentDate}  \n自动部署：[点我部署](http://t.helianshare.com:8006/?url=${encodedUrl})"
  },
  "at": {
    "isAtAll": true
  }
}
EOF
}

echo "通知到：$notificationUrl"
curl -X POST -H "content-type: application/json" $notificationUrl -d "$(generate_post_data)"
echo -e "\n\n所有操作已完成\n\n"
