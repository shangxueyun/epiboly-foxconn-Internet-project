import Vue from 'vue'
import Router from 'vue-router'
import Popper from 'popper.js'
import Login from '@/Login'
// 1st level components
import Alarm from '@/components/alarm'
import Insight from '@/components/insight'
import mapIndex from '@/components/MapIndex'
import analysis from '@/components/analysis'
// 2nd level components
import fire from '@/components/fire'
import AIEngine from '@/components/AIEngine'
import analysisReport from '@/components/analysisReport'
import machineLearning from '@/components/machineLearning'
import alarmInfo from '@/components/alarmInfo'
import ruleEngine from '@/components/ruleEngine'
import dataSummary from '@/components/summary'
import dataIncrement from '@/components/dataIncrement'
// 3rd level components
import analysisTrain from '@/components/analysisTrain'
import analysisModel from '@/components/analysisModel'
import dataIncrementOverview from '@/components/dataIncrementOverview'
import deviceInfo from '@/components/deviceInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      components: {
        default: mapIndex
      }
    },
    {
      path: '/alarm',
      name: '告警',
      redirect: '/alarm/alarmInfo',
      component: Alarm,
      children: [
        {
          path: 'alarmInfo',
          name: '列表信息',
          component: alarmInfo
        },
        {
          path: 'ruleEngine',
          name: '规则引擎',
          component: ruleEngine
        }
      ]
    },
    {
      path: '/insight',
      name: '洞察',
      redirect: '/insight/summary',
      component: Insight,
      children: [
        {
          path: 'summary',
          name: ['总览'],
          component: dataSummary
        },
        {
          path: 'dataIncrement',
          name: ['增量数据'],
          redirect: '/insight/dataIncrement/dataIncrementOverview',
          component: dataIncrement,
          children: [
            {
              path: 'dataIncrementOverview',
              name: ['增量数据', '总览'],
              component: dataIncrementOverview
            },
            {
              path: 'deviceInfo',
              name: ['增量数据', '终端设备'],
              component: deviceInfo,
              children: [
                {
                  path: 'historyLog',
                  name: ['增量数据', '终端设备', '所有列表', '历史数据']
                },
                {
                  path: 'deivceList',
                  name: ['增量数据', '终端设备', '终端分类', '列表'],
                  children: [
                    {
                      path: 'categoryLog',
                      name: ['增量数据', '终端设备', '终端分类', '#sensor', '历史数据']
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }, 
    {
      path: '/analysis',
      name: '分析',
      redirect: '/analysis/analysisReport',
      component: analysis,
      children: [
        {
          path: 'machineLearning',
          name: ['机器学习'],
          redirect: '/analysis/machineLearning/analysisTrain',
          component: machineLearning,
          children: [
            {
              path: 'analysisTrain',
              name: ['机器学习', '训练'],
              component: analysisTrain
            },
            {
              path: 'analysisModel',
              name: ['机器学习', '模型'],
              component: analysisModel
            },
          ]
        },
        {
          path: 'AIEngine',
          name: ['AI引擎'],
          component: AIEngine
        },
        {
          path: 'analysisReport',
          name: ['分析报表'],
          component: analysisReport
        },
      ]
    }
  ]
})
